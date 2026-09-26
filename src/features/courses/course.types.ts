import type { ComponentType } from 'react'
import type { QuizDefinition } from '@/features/quiz'

export type LessonKind = 'lesson' | 'quiz'

/** Outline entry as authored in a course's `course.ts`. */
export interface LessonRef {
  slug: string
  title: string
  kind: LessonKind
}

export interface Chapter {
  id: string
  title: string
  lessons: LessonRef[]
}

export interface Part {
  id: string
  title: string
  chapters: Chapter[]
}

export interface CourseMeta {
  id: string
  title: string
  subtitle: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  /** Short bullet points for "What you'll learn". */
  highlights: string[]
}

/** Flattened, fully-resolved lesson used throughout the UI. */
export interface Lesson extends LessonRef {
  /** `<chapterId>/<slug>` — unique within a course. */
  id: string
  index: number
  chapterId: string
  chapterTitle: string
  partId: string
  partTitle: string
  minutes: number
}

export interface LessonModule {
  default: ComponentType
  frontmatter?: { title?: string; description?: string }
}

export type Loader<T> = () => Promise<T>

export interface Course extends CourseMeta {
  parts: Part[]
  lessons: Lesson[]
  totalMinutes: number
  getLesson(id: string): Lesson | undefined
  /** Loads the lesson body (MDX) and quiz code-split chunks; either is undefined if the lesson has none. */
  loadLesson(id: string): Promise<{ mdx?: LessonModule; quiz?: QuizDefinition }>
}
