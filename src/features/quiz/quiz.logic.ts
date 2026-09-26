import type { QuizAnswers, QuizQuestion, QuizResult } from './quiz.types'

export const correctIndexes = (q: QuizQuestion): number[] =>
  q.options.flatMap((o, i) => (o.correct ? [i] : []))

export const isMultiSelect = (q: QuizQuestion): boolean =>
  q.multi === true || correctIndexes(q).length > 1

/** A question is correct only when the selected set exactly equals the correct set. */
export function gradeQuestion(q: QuizQuestion, selected: readonly number[]): boolean {
  const expected = correctIndexes(q)
  const chosen = new Set(selected)
  return chosen.size === expected.length && expected.every((i) => chosen.has(i))
}

export function gradeQuiz(questions: readonly QuizQuestion[], answers: QuizAnswers): QuizResult {
  const perQuestion = questions.map((q, i) => gradeQuestion(q, answers[i] ?? []))
  return { correct: perQuestion.filter(Boolean).length, total: questions.length, perQuestion }
}

export const toggleSelection = (
  selected: readonly number[],
  index: number,
  multi: boolean,
): number[] => {
  if (!multi) return [index]
  return selected.includes(index)
    ? selected.filter((i) => i !== index)
    : [...selected, index].sort((a, b) => a - b)
}

/** Validation used by content tests; returns human-readable problems. */
export function validateQuiz(questions: readonly QuizQuestion[]): string[] {
  const problems: string[] = []
  if (questions.length === 0) problems.push('quiz has no questions')
  questions.forEach((q, i) => {
    const label = `Q${i + 1}`
    if (!q.prompt.trim()) problems.push(`${label}: empty prompt`)
    if (q.options.length < 2) problems.push(`${label}: needs at least 2 options`)
    if (correctIndexes(q).length === 0) problems.push(`${label}: no correct option`)
    if (correctIndexes(q).length === q.options.length)
      problems.push(`${label}: every option is correct`)
    const texts = q.options.map((o) => o.text.trim().toLowerCase())
    if (new Set(texts).size !== texts.length) problems.push(`${label}: duplicate options`)
  })
  return problems
}
