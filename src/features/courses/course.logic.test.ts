import { describe, expect, it } from 'vitest'
import {
  assertUniqueIds,
  filterChapters,
  flattenLessons,
  formatMinutes,
  getAdjacentLessons,
} from './course.logic'
import { chapter, lesson, part, quiz } from './outline'

const parts = [
  part('p1', 'Part 1', [
    chapter('c1', 'Chapter 1', [lesson('a', 'A'), quiz('quiz', 'Quiz')]),
    chapter('c2', 'Chapter 2', [lesson('a', 'A again')]),
  ]),
]

describe('course logic', () => {
  it('flattens the outline with chapter-scoped ids', () => {
    const lessons = flattenLessons(parts, () => 7)
    expect(lessons.map((l) => l.id)).toEqual(['c1/a', 'c1/quiz', 'c2/a'])
    expect(lessons[2]).toMatchObject({
      index: 2,
      chapterTitle: 'Chapter 2',
      partId: 'p1',
      minutes: 7,
    })
  })

  it('finds adjacent lessons', () => {
    const lessons = flattenLessons(parts)
    expect(getAdjacentLessons(lessons, 'c1/a')).toEqual({ previous: undefined, next: lessons[1] })
    expect(getAdjacentLessons(lessons, 'c2/a').next).toBeUndefined()
  })

  it('rejects duplicate ids', () => {
    expect(() => assertUniqueIds(parts)).not.toThrow()
    expect(() => assertUniqueIds([...parts, part('p2', 'x', [chapter('c1', 'dup', [])])])).toThrow(
      /chapter id "c1"/,
    )
  })

  it('filters chapters by chapter or lesson title, keeping original numbering', () => {
    const chapters = parts.flatMap((p) => p.chapters)
    const summary = (query: string) =>
      filterChapters(chapters, query).map(({ chapter, number }) => [
        number,
        chapter.lessons.map((l) => l.title),
      ])
    expect(summary('')).toEqual([
      [1, ['A', 'Quiz']],
      [2, ['A again']],
    ])
    expect(summary('chapter 2')).toEqual([[2, ['A again']]])
    expect(summary('AGAIN')).toEqual([[2, ['A again']]])
    expect(summary('quiz')).toEqual([[1, ['Quiz']]])
    expect(summary('nothing')).toEqual([])
  })

  it('formats durations', () => {
    expect(formatMinutes(45)).toBe('45 min')
    expect(formatMinutes(120)).toBe('2h')
    expect(formatMinutes(135)).toBe('2h 15m')
  })
})
