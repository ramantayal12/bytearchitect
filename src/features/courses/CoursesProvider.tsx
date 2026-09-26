import type { ReactNode } from 'react'
import { CoursesContext } from './courses-context'
import type { Course } from './course.types'

export function CoursesProvider({
  courses,
  children,
}: {
  courses: readonly Course[]
  children: ReactNode
}) {
  return <CoursesContext.Provider value={courses}>{children}</CoursesContext.Provider>
}
