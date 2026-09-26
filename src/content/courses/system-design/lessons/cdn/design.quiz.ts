import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the main purpose of parent (regional) caches?',
    options: [
      {
        text: 'To reduce the number of requests that reach the origin when many edges miss',
        correct: true,
      },
      { text: 'To encrypt content' },
      { text: 'To replace the origin server entirely' },
    ],
    explanation: 'Many edges share a parent, so the origin sees roughly one fetch per region.',
  },
  {
    prompt: 'Which component filters malicious traffic before it reaches the edge caches?',
    options: [
      { text: 'Accounting system' },
      { text: 'Scrubber servers', correct: true },
      { text: 'Distribution system' },
    ],
    explanation: 'Scrubbers absorb and filter attack traffic.',
  },
  {
    prompt: 'Which factors can the routing system consider when selecting an edge server?',
    options: [
      { text: 'Proximity to the user', correct: true },
      { text: 'Current server load', correct: true },
      { text: 'Server health', correct: true },
      { text: 'The user’s password' },
    ],
    explanation: 'Routing balances proximity, load and health.',
  },
])
