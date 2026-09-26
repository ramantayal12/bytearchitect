export type {
  Chapter,
  Course,
  CourseMeta,
  Lesson,
  LessonKind,
  LessonRef,
  Part,
} from './course.types'
export { chapter, lesson, part, quiz } from './outline'
export {
  assertUniqueIds,
  filterChapters,
  flattenLessons,
  formatMinutes,
  getAdjacentLessons,
  lessonId,
} from './course.logic'
export { defineCourse } from './defineCourse'
export { CoursesProvider } from './CoursesProvider'
export { useCourse, useCourses } from './courses-context'

export const courseRoutes = {
  Catalog: () => import('./pages/CatalogPage'),
  CourseOverview: () => import('./pages/CourseOverviewPage'),
  Lesson: () => import('./pages/LessonPage'),
  NotFound: () => import('./pages/NotFoundPage'),
}
