export interface QuizOption {
  text: string
  correct?: boolean
  /** Shown after submission next to this option. */
  explanation?: string
}

export interface QuizQuestion {
  prompt: string
  options: QuizOption[]
  /** Shown after submission for the whole question. */
  explanation?: string
  /** Force "select all that apply" even with a single correct option. */
  multi?: boolean
}

export type QuizDefinition = QuizQuestion[]

/** For each question, the indexes of the selected options. */
export type QuizAnswers = number[][]

export interface QuizResult {
  correct: number
  total: number
  perQuestion: boolean[]
}

/** Identity helper that gives quiz files full type-checking. */
export const defineQuiz = (questions: QuizDefinition): QuizDefinition => questions
