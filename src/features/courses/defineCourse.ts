import type { QuizDefinition } from '@/features/quiz'
import { assertUniqueIds, flattenLessons } from './course.logic'
import type { Course, CourseMeta, LessonModule, Loader, Part } from './course.types'

interface CourseFiles {
  /** `import.meta.glob('./lessons/**\/*.mdx')` from the course folder. */
  lessonFiles: Record<string, Loader<unknown>>
  /** `import.meta.glob('./lessons/**\/*.quiz.ts', { import: 'default' })` from the course folder. */
  quizFiles: Record<string, Loader<unknown>>
}

interface DefineCourseInput {
  meta: CourseMeta
  parts: Part[]
  /** Lazily imports the module holding the course's lesson and quiz globs (`() => import('./files')`). */
  files: Loader<CourseFiles>
  /** Reading-time estimates keyed by lesson id (from `virtual:lesson-stats`). */
  stats?: Record<string, { minutes: number }>
}

/** "./lessons/dns/intro.mdx" → "dns/intro" */
const idFromPath = (file: string) =>
  file.replace(/^\.\/lessons\//, '').replace(/\.(mdx|quiz\.ts)$/, '')

const indexByLessonId = <T>(files: Record<string, Loader<unknown>>) =>
  new Map(Object.entries(files).map(([file, load]) => [idFromPath(file), load as Loader<T>]))

/**
 * Builds a Course from an outline and the course folder's lesson files.
 * The engine never references a specific course; each course folder calls this.
 */
export function defineCourse({ meta, parts, files, stats = {} }: DefineCourseInput): Course {
  assertUniqueIds(parts)
  const lessons = flattenLessons(parts, (id) => stats[id]?.minutes ?? 5)
  const byId = new Map(lessons.map((l) => [l.id, l]))

  let loaders:
    | Promise<{
        mdx: Map<string, Loader<LessonModule>>
        quizzes: Map<string, Loader<QuizDefinition>>
      }>
    | undefined
  const getLoaders = () =>
    (loaders ??= files().then(({ lessonFiles, quizFiles }) => ({
      mdx: indexByLessonId<LessonModule>(lessonFiles),
      quizzes: indexByLessonId<QuizDefinition>(quizFiles),
    })))

  return {
    ...meta,
    parts,
    lessons,
    totalMinutes: lessons.reduce((sum, l) => sum + l.minutes, 0),
    getLesson: (id) => byId.get(id),
    async loadLesson(id) {
      const { mdx, quizzes } = await getLoaders()
      const [body, quiz] = await Promise.all([mdx.get(id)?.(), quizzes.get(id)?.()])
      return { mdx: body, quiz }
    },
  }
}
