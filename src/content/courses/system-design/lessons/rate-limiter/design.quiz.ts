import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Two gateways read a counter of 99 at the same time, and the limit is 100. What prevents both from allowing requests?',
    options: [
      { text: 'An atomic check-and-update operation in the counter store', correct: true },
      { text: 'Increasing the limit to 101' },
      { text: 'Caching the counter in each gateway' },
    ],
    explanation: 'Atomic operations eliminate the read-modify-write race.',
  },
  {
    prompt: 'What is the trade-off of counting locally in each gateway and syncing periodically?',
    options: [
      { text: 'Lower latency but possible small overshoots of the limit', correct: true },
      { text: 'Exact limits but higher latency' },
      { text: 'No trade-off' },
    ],
    explanation: 'Approximate counting avoids a network call per request.',
  },
  {
    prompt: 'Why do rate-limit counters usually have TTLs?',
    options: [
      { text: 'So state for idle keys expires and memory stays bounded', correct: true },
      { text: 'To make limits stricter' },
      { text: 'Because stores require TTLs' },
    ],
    explanation: 'Millions of keys would otherwise accumulate forever.',
  },
])
