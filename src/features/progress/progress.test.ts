import { describe, expect, it } from 'vitest'
import { nextQuizScore, resumeLessonId, summarizeProgress } from './progress.logic'
import { createMemoryProgressRepository } from './progress.repository'
import { applyPatch, emptyProgress } from './progress.types'

describe('progress logic', () => {
  const ids = ['a/1', 'a/2', 'b/1']

  it('summarizes completion', () => {
    const progress = applyPatch(emptyProgress(), { completed: { 'a/1': true, 'x/9': true } })
    expect(summarizeProgress(ids, progress)).toEqual({ completed: 1, total: 3, percent: 33 })
    expect(summarizeProgress(ids, undefined).percent).toBe(0)
  })

  it('resumes at the last lesson, else the first incomplete one', () => {
    expect(resumeLessonId(ids, undefined)).toBe('a/1')
    expect(resumeLessonId(ids, applyPatch(emptyProgress(), { completed: { 'a/1': true } }))).toBe(
      'a/2',
    )
    expect(resumeLessonId(ids, applyPatch(emptyProgress(), { lastLessonId: 'b/1' }))).toBe('b/1')
  })

  it('tracks best, last and attempts for quizzes', () => {
    const first = nextQuizScore(undefined, 3, 4, 1)
    const second = nextQuizScore(first, 2, 4, 2)
    expect(second).toEqual({ best: 3, last: 2, total: 4, attempts: 2, at: 2 })
  })

  it('un-marks completion and keeps original completion time', () => {
    const p1 = applyPatch(emptyProgress(), { completed: { 'a/1': true } }, 100)
    expect(applyPatch(p1, { completed: { 'a/1': true } }, 200).completed['a/1']).toBe(100)
    expect(applyPatch(p1, { completed: { 'a/1': false } }).completed).toEqual({})
  })

  it('toggles bookmarks and keeps the original bookmark time', () => {
    const p1 = applyPatch(emptyProgress(), { bookmarks: { 'a/1': true } }, 100)
    expect(applyPatch(p1, { bookmarks: { 'a/1': true } }, 200).bookmarks).toEqual({ 'a/1': 100 })
    expect(applyPatch(p1, { bookmarks: { 'a/1': false } }).bookmarks).toEqual({})
  })

  it('resets completions, quizzes and the resume point but keeps bookmarks', () => {
    const progress = applyPatch(
      emptyProgress(),
      {
        completed: { 'a/1': true },
        quizzes: { 'a/1': nextQuizScore(undefined, 1, 2, 1) },
        bookmarks: { 'b/1': true },
        lastLessonId: 'a/2',
      },
      100,
    )
    expect(applyPatch(progress, { reset: true })).toEqual({
      completed: {},
      quizzes: {},
      bookmarks: { 'b/1': 100 },
    })
  })
})

describe('memory repository', () => {
  it('persists patches per user and course', async () => {
    const repo = createMemoryProgressRepository()
    await repo.update('u1', 'c', {
      completed: { 'a/1': true },
      bookmarks: { 'a/2': true },
      lastLessonId: 'a/2',
    })
    expect(await repo.get('u1', 'c')).toMatchObject({
      completed: { 'a/1': expect.any(Number) },
      bookmarks: { 'a/2': expect.any(Number) },
      lastLessonId: 'a/2',
    })
    expect(await repo.get('u2', 'c')).toEqual(emptyProgress())
  })
})
