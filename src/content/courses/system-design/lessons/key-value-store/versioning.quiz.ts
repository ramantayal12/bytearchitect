import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Version X has clock [A:2, B:1] and version Y has clock [A:2, C:1]. What is their relationship?',
    options: [
      { text: 'X happened before Y' },
      { text: 'Y happened before X' },
      { text: 'They are concurrent and conflict', correct: true },
    ],
    explanation: 'Neither clock is greater than or equal to the other in every entry.',
  },
  {
    prompt: 'Why is last-write-wins risky?',
    options: [
      {
        text: 'Clock drift can pick the wrong winner, and concurrent updates are silently lost',
        correct: true,
      },
      { text: 'It requires too much storage' },
      { text: 'It makes reads slower' },
    ],
    explanation: 'LWW discards data whenever writes are concurrent.',
  },
  {
    prompt:
      'With N = 3, which configuration favors fast, highly available writes at the cost of possibly stale reads?',
    options: [
      { text: 'W = 3, R = 3' },
      { text: 'W = 1, R = 1', correct: true },
      { text: 'W = 2, R = 2' },
    ],
    explanation: 'W = 1 and R = 1 do not guarantee overlap between reads and writes.',
  },
])
