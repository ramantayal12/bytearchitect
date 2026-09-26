import type { Chapter, Lesson, Part } from './course.types'

export const lessonId = (chapterId: string, slug: string) => `${chapterId}/${slug}`

export function flattenLessons(
  parts: readonly Part[],
  minutesFor: (id: string) => number = () => 5,
): Lesson[] {
  const lessons: Lesson[] = []
  for (const part of parts) {
    for (const chapter of part.chapters) {
      for (const ref of chapter.lessons) {
        const id = lessonId(chapter.id, ref.slug)
        lessons.push({
          ...ref,
          id,
          index: lessons.length,
          chapterId: chapter.id,
          chapterTitle: chapter.title,
          partId: part.id,
          partTitle: part.title,
          minutes: minutesFor(id),
        })
      }
    }
  }
  return lessons
}

/**
 * Sidebar search: case-insensitive match on chapter and lesson titles. A chapter whose title
 * matches keeps all its lessons; otherwise only matching lessons are kept and empty chapters
 * are dropped. `number` is the chapter's 1-based position in the unfiltered list.
 */
export function filterChapters(
  chapters: readonly Chapter[],
  query: string,
): { chapter: Chapter; number: number }[] {
  const needle = query.trim().toLowerCase()
  const numbered = chapters.map((chapter, i) => ({ chapter, number: i + 1 }))
  if (!needle) return numbered
  const matches = (text: string) => text.toLowerCase().includes(needle)
  return numbered.flatMap(({ chapter, number }) => {
    if (matches(chapter.title)) return [{ chapter, number }]
    const lessons = chapter.lessons.filter((l) => matches(l.title))
    return lessons.length ? [{ chapter: { ...chapter, lessons }, number }] : []
  })
}

export function getAdjacentLessons<T extends { id: string }>(lessons: readonly T[], id: string) {
  const i = lessons.findIndex((l) => l.id === id)
  return { previous: i > 0 ? lessons[i - 1] : undefined, next: i >= 0 ? lessons[i + 1] : undefined }
}

/** Throws on duplicate ids so authoring mistakes surface immediately. */
export function assertUniqueIds(parts: readonly Part[]): void {
  const seen = new Set<string>()
  const check = (kind: string, id: string) => {
    if (seen.has(`${kind}:${id}`)) throw new Error(`Duplicate ${kind} id "${id}" in course outline`)
    seen.add(`${kind}:${id}`)
  }
  for (const part of parts) {
    check('part', part.id)
    for (const chapter of part.chapters) {
      check('chapter', chapter.id)
      for (const l of chapter.lessons) check('lesson', lessonId(chapter.id, l.slug))
    }
  }
}

export const formatMinutes = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h}h ${m}m` : `${h}h`
}
