import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which resource dominates the capacity planning of an online judge?',
    options: [
      { text: 'CPU capacity for executing submissions', correct: true },
      { text: 'Storage for problem statements' },
      { text: 'Bandwidth for serving the editor' },
    ],
    explanation: 'Every submission runs against many test cases.',
  },
  {
    prompt: 'A judge worker crashes after running half the tests. What happens?',
    options: [
      {
        text: 'The job was not acknowledged, so it is redelivered and judged again deterministically',
        correct: true,
      },
      { text: 'The submission is marked accepted' },
      { text: 'The user must resubmit manually' },
    ],
    explanation: 'Acknowledging only after writing the verdict makes crashes safe.',
  },
  {
    prompt: 'Why destroy the sandbox after each submission?',
    options: [
      {
        text: 'So nothing written by one user’s code persists into another execution',
        correct: true,
      },
      { text: 'To free the compiler license' },
      { text: 'Because sandboxes cannot run two programs' },
    ],
    explanation: 'Disposable environments prevent cross-contamination.',
  },
  {
    prompt: 'How can the platform prepare for a scheduled contest?',
    multi: true,
    options: [
      { text: 'Scale out judge workers before it starts', correct: true },
      { text: 'Prioritize contest submissions over practice runs', correct: true },
      { text: 'Stop judging at the first failed test', correct: true },
      { text: 'Disable sandboxing to save time' },
    ],
    explanation: 'Security must never be traded for speed.',
  },
  {
    prompt: 'What data structure efficiently maintains contest rankings?',
    options: [
      {
        text: 'A sorted set keyed by a composite score of solved problems and penalty',
        correct: true,
      },
      { text: 'An unsorted list scanned on every request' },
      { text: 'A blob store' },
    ],
    explanation: 'Sorted sets give fast rank lookups and top-N pages.',
  },
  {
    prompt: 'Why do judges keep pools of pre-warmed sandboxes?',
    options: [
      { text: 'To reduce start-up overhead for each execution', correct: true },
      { text: 'To share state between submissions' },
      { text: 'To allow network access' },
    ],
    explanation: 'Warm pools cut latency without weakening isolation.',
  },
])
