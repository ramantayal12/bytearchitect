import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the most critical security concern for an online judge?',
    options: [
      {
        text: 'Running untrusted user code without letting it harm the host or other users',
        correct: true,
      },
      { text: 'Rendering problem statements in Markdown' },
      { text: 'Sorting the leaderboard' },
    ],
    explanation: 'Every submission is arbitrary code that must be sandboxed.',
  },
  {
    prompt: 'Why do some problems need a checker program instead of exact output comparison?',
    options: [
      {
        text: 'Many different outputs can be correct, such as any valid path or floating-point answers within a tolerance',
        correct: true,
      },
      { text: 'Checkers make code run faster' },
      { text: 'Exact comparison is impossible in any language' },
    ],
    explanation: 'Checkers validate correctness rather than match a single string.',
  },
  {
    prompt: 'How does "run" differ from "submit"?',
    options: [
      {
        text: 'Run uses examples or custom input for debugging; submit uses all hidden tests and records a verdict',
        correct: true,
      },
      { text: 'Run executes on the user’s own computer' },
      { text: 'Submit skips compilation' },
    ],
    explanation: 'Both use the same infrastructure with different test sets.',
  },
])
