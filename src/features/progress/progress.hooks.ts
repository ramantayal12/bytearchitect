import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuth } from '@/features/auth'
import { useProgressRepository } from './progress-context'
import {
  applyPatch,
  emptyProgress,
  type CourseProgress,
  type ProgressPatch,
} from './progress.types'

const progressKey = (uid: string | undefined, courseId: string) =>
  ['progress', uid, courseId] as const

/** Only verified users have readable progress (enforced by Firestore rules too). */
const useVerifiedUid = () => {
  const { user } = useAuth()
  return user?.emailVerified ? user.uid : undefined
}

/** Progress for the signed-in, verified user. `data` is undefined for guests. */
export function useCourseProgress(courseId: string) {
  const uid = useVerifiedUid()
  const repo = useProgressRepository()
  return useQuery({
    queryKey: progressKey(uid, courseId),
    queryFn: () => repo.get(uid!, courseId),
    enabled: Boolean(uid),
    staleTime: 5 * 60_000,
  })
}

/**
 * Apply a progress patch optimistically and persist it with a single write.
 * The patch may be computed from the current (cached) progress via a function.
 */
export function useUpdateProgress(courseId: string) {
  const uid = useVerifiedUid()
  const repo = useProgressRepository()
  const client = useQueryClient()
  const key = progressKey(uid, courseId)

  return useMutation({
    mutationFn: async (patch: ProgressPatch) => {
      if (!uid) throw new Error('Not signed in')
      await repo.update(uid, courseId, patch)
    },
    onMutate: async (patch) => {
      await client.cancelQueries({ queryKey: key })
      const previous = client.getQueryData<CourseProgress>(key)
      client.setQueryData(key, applyPatch(previous ?? emptyProgress(), patch))
      return { previous }
    },
    onError: (_error, _patch, context) => {
      client.setQueryData(key, context?.previous)
      toast.error('Couldn’t save your progress. Please check your connection.')
    },
  })
}
