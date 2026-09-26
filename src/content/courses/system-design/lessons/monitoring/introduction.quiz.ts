import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Which telemetry type best shows where time is spent across services for a single request?',
    options: [{ text: 'Metrics' }, { text: 'Traces', correct: true }, { text: 'Counters' }],
    explanation: 'Traces follow a request through each service with timing per span.',
  },
  {
    prompt: 'Which are the four golden signals?',
    options: [
      { text: 'Latency', correct: true },
      { text: 'Traffic', correct: true },
      { text: 'Errors', correct: true },
      { text: 'Saturation', correct: true },
      { text: 'Code coverage' },
    ],
    explanation: 'Code coverage is a testing metric, not a runtime signal.',
  },
  {
    prompt: 'Why is using user ID as a metric label risky?',
    options: [
      { text: 'It creates a separate time series per user, exploding cardinality', correct: true },
      { text: 'It makes metrics less accurate' },
      { text: 'Labels cannot contain numbers' },
    ],
    explanation: 'High-cardinality labels overwhelm metric storage and queries.',
  },
])
