import {
  applyPatch,
  emptyProgress,
  type CourseProgress,
  type ProgressPatch,
} from './progress.types'

/**
 * Persistence contract for learner progress. One document per (user, course) and
 * one write per patch keeps usage minimal (important on Firebase's free tier).
 */
export interface ProgressRepository {
  get(uid: string, courseId: string): Promise<CourseProgress>
  update(uid: string, courseId: string, patch: ProgressPatch): Promise<void>
}

/** In-memory implementation — used by tests and handy for local prototyping. */
export function createMemoryProgressRepository(): ProgressRepository {
  const store = new Map<string, CourseProgress>()
  const key = (uid: string, courseId: string) => `${uid}/${courseId}`
  return {
    get: async (uid, courseId) => structuredClone(store.get(key(uid, courseId)) ?? emptyProgress()),
    update: async (uid, courseId, patch) => {
      store.set(
        key(uid, courseId),
        applyPatch(store.get(key(uid, courseId)) ?? emptyProgress(), patch),
      )
    },
  }
}
