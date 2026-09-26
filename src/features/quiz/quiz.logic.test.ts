import { describe, expect, it } from 'vitest'
import {
  gradeQuestion,
  gradeQuiz,
  isMultiSelect,
  toggleSelection,
  validateQuiz,
} from './quiz.logic'
import type { QuizQuestion } from './quiz.types'

const single: QuizQuestion = {
  prompt: 'One?',
  options: [{ text: 'a', correct: true }, { text: 'b' }, { text: 'c' }],
}
const multi: QuizQuestion = {
  prompt: 'Many?',
  options: [{ text: 'a', correct: true }, { text: 'b', correct: true }, { text: 'c' }],
}

describe('quiz logic', () => {
  it('detects multi-select questions', () => {
    expect(isMultiSelect(single)).toBe(false)
    expect(isMultiSelect(multi)).toBe(true)
    expect(isMultiSelect({ ...single, multi: true })).toBe(true)
  })

  it('grades by exact set match', () => {
    expect(gradeQuestion(single, [0])).toBe(true)
    expect(gradeQuestion(single, [1])).toBe(false)
    expect(gradeQuestion(multi, [1, 0])).toBe(true)
    expect(gradeQuestion(multi, [0])).toBe(false)
    expect(gradeQuestion(multi, [0, 1, 2])).toBe(false)
  })

  it('grades a whole quiz, treating missing answers as wrong', () => {
    expect(gradeQuiz([single, multi], [[0]])).toEqual({
      correct: 1,
      total: 2,
      perQuestion: [true, false],
    })
  })

  it('toggles selections', () => {
    expect(toggleSelection([1], 2, false)).toEqual([2])
    expect(toggleSelection([2], 0, true)).toEqual([0, 2])
    expect(toggleSelection([0, 2], 2, true)).toEqual([0])
  })

  it('validates quiz definitions', () => {
    expect(validateQuiz([single, multi])).toEqual([])
    expect(validateQuiz([{ prompt: 'x', options: [{ text: 'a' }, { text: 'b' }] }])).toContain(
      'Q1: no correct option',
    )
    expect(validateQuiz([])).toContain('quiz has no questions')
  })
})
