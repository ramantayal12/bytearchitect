import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the difference between authorization and settlement?',
    options: [
      {
        text: 'Authorization reserves funds within seconds; settlement transfers money between banks later',
        correct: true,
      },
      { text: 'They are two names for the same step' },
      { text: 'Settlement happens before authorization' },
    ],
    explanation: 'Settlement is usually batched and can take a day or more.',
  },
  {
    prompt:
      'A charge request to the PSP times out. Why is retrying it immediately with a new request dangerous?',
    options: [
      {
        text: 'The first request may have succeeded, so a new request could charge the customer twice',
        correct: true,
      },
      { text: 'PSPs never accept retries' },
      { text: 'Timeouts always mean the card was declined' },
    ],
    explanation: 'Timeouts are ambiguous; idempotency keys make retries safe.',
  },
  {
    prompt: 'Why use PSP tokenization for card details?',
    options: [
      {
        text: 'Raw card numbers never touch our servers, reducing security risk and compliance scope',
        correct: true,
      },
      { text: 'Tokens make payments settle instantly' },
      { text: 'Tokenization removes the need for a ledger' },
    ],
    explanation: 'The PSP stores card data; we store a token.',
  },
])
