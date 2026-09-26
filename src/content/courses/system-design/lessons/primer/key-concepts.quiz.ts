import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Roughly how much downtime per year does 99.99 percent availability allow?',
    options: [
      { text: 'About 53 minutes', correct: true },
      { text: 'About 8.8 hours' },
      { text: 'About 5 seconds' },
    ],
    explanation: '0.01 percent of 525,600 minutes is about 53 minutes.',
  },
  {
    prompt: 'Why does tail latency (p99) matter in fan-out requests?',
    options: [
      {
        text: 'A request that waits on many backends is likely to hit at least one slow response',
        correct: true,
      },
      { text: 'Tail latency only affects batch jobs' },
      { text: 'p99 is always lower than p50' },
    ],
    explanation: 'The more calls per request, the more the slowest one dominates.',
  },
  {
    prompt: 'What does a fencing token prevent?',
    options: [
      {
        text: 'A stale leader or lock holder from making writes after losing ownership',
        correct: true,
      },
      { text: 'Users from logging in' },
      { text: 'Cache misses' },
    ],
    explanation: 'Storage rejects writes carrying older tokens.',
  },
])
