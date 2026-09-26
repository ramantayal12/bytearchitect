export type {
  QuizAnswers,
  QuizDefinition,
  QuizOption,
  QuizQuestion,
  QuizResult,
} from './quiz.types'
export { defineQuiz } from './quiz.types'
export { gradeQuestion, gradeQuiz, isMultiSelect, validateQuiz } from './quiz.logic'
export { Quiz, type QuizProps } from './components/Quiz'
