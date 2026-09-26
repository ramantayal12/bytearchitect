import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Which pattern appears in key-value stores, caches, queues and search indexes to spread data across machines?',
    options: [
      { text: 'Partitioning', correct: true },
      { text: 'Synchronous RPC' },
      { text: 'Vertical scaling' },
    ],
    explanation: 'Partitioning splits data or work so it can scale horizontally.',
  },
  {
    prompt:
      'Which building block is the best fit for sending a reminder email exactly 7 days after inactivity?',
    options: [
      { text: 'Task scheduler', correct: true },
      { text: 'CDN' },
      { text: 'Load balancer' },
    ],
    explanation: 'Delayed and recurring jobs are the scheduler’s purpose.',
  },
  {
    prompt: 'Why does idempotency appear across queues, schedulers and pub-sub consumers?',
    options: [
      {
        text: 'They provide at-least-once processing, so repeated work must be harmless',
        correct: true,
      },
      { text: 'Idempotency makes messages smaller' },
      { text: 'It is required for caching' },
    ],
    explanation: 'Retries and redelivery are common, so operations must be safe to repeat.',
  },
])
