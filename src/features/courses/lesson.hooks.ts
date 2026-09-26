import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { Course, Lesson } from './course.types'

const moduleQuery = (course: Course, lesson: Lesson) => ({
  queryKey: ['lesson-module', course.id, lesson.id] as const,
  queryFn: () => course.loadLesson(lesson.id),
  staleTime: Infinity,
  gcTime: 10 * 60_000,
})

/** Loads a lesson's MDX body and quiz (code-split chunks). */
export function useLessonModules(course: Course, lesson: Lesson) {
  return useQuery(moduleQuery(course, lesson))
}

/** Warm the chunk for a lesson (e.g. the next one) so navigation feels instant. */
export function usePrefetchLesson(course: Course) {
  const client = useQueryClient()
  return useCallback(
    (lesson: Lesson | undefined) => {
      if (lesson) void client.prefetchQuery(moduleQuery(course, lesson))
    },
    [client, course],
  )
}
