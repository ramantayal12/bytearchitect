import { createContext, useContext } from 'react'
import type { Course } from './course.types'

export const CoursesContext = createContext<readonly Course[] | null>(null)

export function useCourses(): readonly Course[] {
  const courses = useContext(CoursesContext)
  if (!courses) throw new Error('useCourses must be used inside <CoursesProvider>')
  return courses
}

export function useCourse(courseId: string | undefined): Course | undefined {
  return useCourses().find((c) => c.id === courseId)
}
