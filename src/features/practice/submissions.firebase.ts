import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore/lite'
import { getFirebase } from '@/lib/firebase'
import type { NewSubmission, Submission } from './practice.types'
import { SUBMISSION_HISTORY_LIMIT, type SubmissionRepository } from './submissions.repository'

/**
 * Collection: users/{uid}/problems/{problemId}/submissions/{submissionId}
 *   { language, code, verdict, passed, total, runtimeMs, createdAt, failure? }
 * Problem keys contain "/", which is encoded as "__" in the document id. Submissions are
 * immutable, and one write each keeps usage within Firebase's free tier.
 */
const problemDocId = (problemKey: string) => problemKey.replaceAll('/', '__')

const submissionsRef = (uid: string, problemKey: string) =>
  collection(getFirebase().db, 'users', uid, 'problems', problemDocId(problemKey), 'submissions')

interface StoredSubmission extends Omit<Submission, 'id' | 'createdAt'> {
  createdAt: Timestamp | null
}

/** Firestore rejects `undefined` fields, so optional failure details are dropped when empty. */
const withoutUndefined = <T extends object>(value: T): T =>
  Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)) as T

export function createFirestoreSubmissionRepository(): SubmissionRepository {
  return {
    async list(uid, problemKey) {
      const snap = await getDocs(
        query(
          submissionsRef(uid, problemKey),
          orderBy('createdAt', 'desc'),
          limit(SUBMISSION_HISTORY_LIMIT),
        ),
      )
      return snap.docs.map((doc) => {
        const data = doc.data() as StoredSubmission
        return { ...data, id: doc.id, createdAt: data.createdAt?.toMillis() ?? Date.now() }
      })
    },

    async add(uid, problemKey, submission: NewSubmission) {
      const { failure, ...rest } = submission
      const ref = await addDoc(submissionsRef(uid, problemKey), {
        ...rest,
        ...(failure && { failure: withoutUndefined(failure) }),
        createdAt: serverTimestamp(),
      })
      return { ...submission, id: ref.id, createdAt: Date.now() }
    },
  }
}
