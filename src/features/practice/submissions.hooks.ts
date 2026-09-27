import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuth } from '@/features/auth'
import { useSubmissionRepository } from './practice-context'
import type { NewSubmission, Submission } from './practice.types'
import { SUBMISSION_HISTORY_LIMIT } from './submissions.repository'

const submissionsKey = (uid: string | undefined, problemKey: string) =>
  ['submissions', uid, problemKey] as const

/** Submissions are readable only by verified users (enforced by Firestore rules too). */
const useVerifiedUid = () => {
  const { user } = useAuth()
  return user?.emailVerified ? user.uid : undefined
}

/** The signed-in learner's recent submissions for a problem, newest first. */
export function useSubmissions(problemKey: string) {
  const uid = useVerifiedUid()
  const repo = useSubmissionRepository()
  return useQuery({
    queryKey: submissionsKey(uid, problemKey),
    queryFn: () => repo.list(uid!, problemKey),
    enabled: Boolean(uid),
    staleTime: 5 * 60_000,
  })
}

/** Stores a submission (one write) and prepends it to the cached history. */
export function useRecordSubmission(problemKey: string) {
  const uid = useVerifiedUid()
  const repo = useSubmissionRepository()
  const client = useQueryClient()
  return useMutation({
    mutationFn: (submission: NewSubmission) => {
      if (!uid) throw new Error('Not signed in')
      return repo.add(uid, problemKey, submission)
    },
    onSuccess: (saved) => {
      const key = submissionsKey(uid, problemKey)
      // Prepend to a history that's already loaded; otherwise let the next read fetch it all,
      // so earlier submissions aren't hidden behind a cache holding only the new one.
      if (client.getQueryData(key))
        client.setQueryData<Submission[]>(key, (previous = []) =>
          [saved, ...previous].slice(0, SUBMISSION_HISTORY_LIMIT),
        )
      else void client.invalidateQueries({ queryKey: key })
    },
    onError: () => toast.error('Couldn’t save your submission. Please check your connection.'),
  })
}
