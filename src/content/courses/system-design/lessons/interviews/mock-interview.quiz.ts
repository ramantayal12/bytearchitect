import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'In the mock interview, why did the candidate ask whether notifications include bulk campaigns?',
    options: [
      {
        text: 'Bulk campaigns could flood the path used by urgent notifications, so they change the design',
        correct: true,
      },
      { text: 'To decide which programming language to use' },
      { text: 'Because campaigns do not need to be stored' },
    ],
    explanation:
      'The answer led directly to separate priority queues so security codes are never stuck behind campaigns.',
  },
  {
    prompt: 'How did the design keep a provider outage from losing notifications?',
    options: [
      {
        text: 'Messages are deleted from the queue only after the provider accepts them, with backoff and circuit breakers while it is down',
        correct: true,
      },
      { text: 'The API calls providers synchronously and returns errors to callers' },
      { text: 'Notifications are only kept in worker memory' },
    ],
    explanation: 'Durable queues turn provider outages into delays rather than losses.',
  },
  {
    prompt: 'Which statements about duplicates in the design are accurate?',
    options: [
      {
        text: 'An idempotency key at the API prevents duplicates from caller retries',
        correct: true,
      },
      {
        text: 'Checking per-channel status before sending makes worker redeliveries rarely duplicate',
        correct: true,
      },
      { text: 'The design guarantees exactly-once delivery with every provider' },
    ],
    explanation:
      'A small window remains for providers without idempotency support, which the requirements allow.',
  },
])
