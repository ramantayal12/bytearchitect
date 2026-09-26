import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'A remote call times out. What does the caller know about the outcome?',
    options: [
      { text: 'The request definitely failed' },
      { text: 'The request definitely succeeded' },
      {
        text: 'Nothing for certain — the server may or may not have performed the operation',
        correct: true,
      },
    ],
    explanation:
      'This is partial failure: the request or the response may have been lost, or the server may have crashed.',
  },
  {
    prompt: 'Why should clients send an idempotency key when charging a card?',
    options: [
      { text: 'To encrypt the payment details' },
      {
        text: 'So the server can detect and ignore duplicate requests caused by retries',
        correct: true,
      },
      { text: 'To make the request faster' },
    ],
    explanation: 'Idempotency keys make retries safe for operations that must not happen twice.',
  },
  {
    prompt: 'Which techniques make RPC-based systems more robust?',
    options: [
      { text: 'Timeouts on every call', correct: true },
      { text: 'Retries with exponential backoff and jitter', correct: true },
      { text: 'Circuit breakers', correct: true },
      { text: 'Retrying immediately in a tight loop until success' },
    ],
    explanation:
      'Tight retry loops amplify load on a struggling service and can cause cascading failure.',
  },
])
