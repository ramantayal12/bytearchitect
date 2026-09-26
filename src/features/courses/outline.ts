import type { Chapter, LessonRef, Part } from './course.types'

/** Tiny DSL for authoring course outlines. */
export const lesson = (slug: string, title: string): LessonRef => ({ slug, title, kind: 'lesson' })
export const quiz = (slug: string, title: string): LessonRef => ({ slug, title, kind: 'quiz' })
export const chapter = (id: string, title: string, lessons: LessonRef[]): Chapter => ({
  id,
  title,
  lessons,
})
export const part = (id: string, title: string, chapters: Chapter[]): Part => ({
  id,
  title,
  chapters,
})
