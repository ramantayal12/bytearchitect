export type {
  ClassSignature,
  Comparison,
  Difficulty,
  Example,
  FunctionSignature,
  Language,
  Problem,
  ProblemDefinition,
  ProblemRef,
  ProblemSet,
  ProblemSetMeta,
  Signature,
  Submission,
  TestCase,
} from './practice.types'
export { defineProblem, defineProblemSet, problem } from './defineProblemSet'
export { validateProblem } from './problem.logic'
export { languages, starterCode } from './signature'
export {
  createMemorySubmissionRepository,
  type SubmissionRepository,
} from './submissions.repository'
export { createFirestoreSubmissionRepository } from './submissions.firebase'
export { PracticeProvider } from './PracticeProvider'
export { useProblemSets } from './practice-context'
export { ProblemSetCard } from './components/ProblemSetCard'
// In-process judging, for the content tests that verify every problem's reference solutions.
export { inProcessHarnesses, runInProcess } from './runner/in-process'
export { PYODIDE_VERSION } from './runner/python'

export const practiceRoutes = {
  ProblemSets: () => import('./pages/PracticePage'),
  ProblemSet: () => import('./pages/ProblemSetPage'),
  Problem: () => import('./pages/ProblemPage'),
}
