import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'If the rate limiter’s data store is unavailable, what do most APIs do for general limits?',
    options: [
      { text: 'Fail open — allow requests', correct: true },
      { text: 'Fail closed — reject all requests' },
      { text: 'Shut down the API' },
    ],
    explanation: 'Failing closed would turn a limiter failure into a full outage.',
  },
  {
    prompt: 'Why must a distributed rate limiter share state across API servers?',
    options: [
      {
        text: 'Otherwise a client spreading requests across N servers could get N times its limit',
        correct: true,
      },
      { text: 'To reduce memory usage' },
      { text: 'Because servers cannot count requests' },
    ],
    explanation: 'Independent local counters multiply the effective limit.',
  },
  {
    prompt: 'What is the main scaling challenge of the rate limiter’s state?',
    options: [
      { text: 'The high rate of atomic updates, one or more per API request', correct: true },
      { text: 'The total size of the state' },
      { text: 'Storing request bodies' },
    ],
    explanation: 'State is small; update throughput is the bottleneck.',
  },
])
