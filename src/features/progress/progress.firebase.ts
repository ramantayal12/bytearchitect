import {
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore/lite'
import { getFirebase } from '@/lib/firebase'
import type { ProgressRepository } from './progress.repository'
import type { CourseProgress, QuizScore } from './progress.types'

/**
 * Document: users/{uid}/courses/{courseId}
 *   { completed: { [key]: Timestamp }, quizzes: { [key]: QuizScore },
 *     bookmarks: { [key]: Timestamp }, lastLessonId, updatedAt }
 * Lesson ids contain "/", which is encoded as "__" in map keys.
 */
const encode = (lessonId: string) => lessonId.replaceAll('/', '__')
const decode = (key: string) => key.replaceAll('__', '/')

interface StoredQuizScore extends Omit<QuizScore, 'at'> {
  at: Timestamp
}

interface StoredProgress {
  completed?: Record<string, Timestamp>
  quizzes?: Record<string, StoredQuizScore>
  bookmarks?: Record<string, Timestamp>
  lastLessonId?: string
}

/** lessonId → true/false becomes encoded key → server time / field deletion. */
const toggleMap = (changes: Record<string, boolean>) =>
  Object.fromEntries(
    Object.entries(changes).map(([id, on]) => [encode(id), on ? serverTimestamp() : deleteField()]),
  )

const ref = (uid: string, courseId: string) =>
  doc(getFirebase().db, 'users', uid, 'courses', courseId)

export function createFirestoreProgressRepository(): ProgressRepository {
  return {
    async get(uid, courseId) {
      const snap = await getDoc(ref(uid, courseId))
      const data = (snap.data() ?? {}) as StoredProgress
      const progress: CourseProgress = {
        completed: {},
        quizzes: {},
        bookmarks: {},
        lastLessonId: data.lastLessonId,
      }
      for (const [k, ts] of Object.entries(data.completed ?? {}))
        progress.completed[decode(k)] = ts.toMillis()
      for (const [k, ts] of Object.entries(data.bookmarks ?? {}))
        progress.bookmarks[decode(k)] = ts.toMillis()
      for (const [k, s] of Object.entries(data.quizzes ?? {}))
        progress.quizzes[decode(k)] = { ...s, at: s.at.toMillis() }
      return progress
    },

    async update(uid, courseId, patch) {
      const data: Record<string, unknown> = { updatedAt: serverTimestamp() }
      if (patch.reset) {
        data.completed = deleteField()
        data.quizzes = deleteField()
        data.lastLessonId = deleteField()
      }
      if (patch.completed) data.completed = toggleMap(patch.completed)
      if (patch.bookmarks) data.bookmarks = toggleMap(patch.bookmarks)
      if (patch.quizzes) {
        data.quizzes = Object.fromEntries(
          Object.entries(patch.quizzes).map(([id, s]) => [
            encode(id),
            { ...s, at: Timestamp.fromMillis(s.at) },
          ]),
        )
      }
      if (patch.lastLessonId) data.lastLessonId = patch.lastLessonId
      await setDoc(ref(uid, courseId), data, { merge: true })
    },
  }
}
