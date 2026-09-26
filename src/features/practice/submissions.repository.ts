import type { NewSubmission, Submission } from './practice.types'

/** Submissions shown per problem; older ones stay stored but aren't listed. */
export const SUBMISSION_HISTORY_LIMIT = 20

/**
 * Persistence contract for a learner's submissions. `problemKey` is
 * `<setId>/<slug>`; `list` returns the newest first, at most SUBMISSION_HISTORY_LIMIT.
 */
export interface SubmissionRepository {
  list(uid: string, problemKey: string): Promise<Submission[]>
  add(uid: string, problemKey: string, submission: NewSubmission): Promise<Submission>
}

/** In-memory implementation — used by tests and handy for local prototyping. */
export function createMemorySubmissionRepository(): SubmissionRepository {
  const store = new Map<string, Submission[]>()
  const key = (uid: string, problemKey: string) => `${uid}/${problemKey}`
  let nextId = 1
  return {
    list: async (uid, problemKey) =>
      structuredClone((store.get(key(uid, problemKey)) ?? []).slice(0, SUBMISSION_HISTORY_LIMIT)),
    add: async (uid, problemKey, submission) => {
      const saved: Submission = { ...submission, id: String(nextId++), createdAt: Date.now() }
      store.set(key(uid, problemKey), [saved, ...(store.get(key(uid, problemKey)) ?? [])])
      return structuredClone(saved)
    },
  }
}
