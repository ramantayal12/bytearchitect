import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'The feed store becomes unavailable. What is a sensible graceful-degradation response?',
    options: [
      { text: 'Serve a non-personalized trending feed until it recovers', correct: true },
      { text: 'Return an error page for the entire site' },
      { text: 'Block question pages until the feed store is back' },
    ],
    explanation: 'Enhancements should fail without taking the core experience down.',
  },
  {
    prompt:
      'Why is a short time-to-live without purges sometimes better for very active questions?',
    options: [
      {
        text: 'Purging on every new answer would generate heavy purge traffic for little benefit',
        correct: true,
      },
      { text: 'CDNs cannot purge individual pages' },
      { text: 'Active questions should never be cached' },
    ],
    explanation:
      'When content changes every few seconds, a brief TTL gives similar freshness at lower cost.',
  },
  {
    prompt: 'Which abuse controls fit naturally as consumers of the content event stream?',
    multi: true,
    options: [
      { text: 'Spam and toxicity classifiers', correct: true },
      { text: 'Vote-ring detection', correct: true },
      { text: 'Duplicate question detection', correct: true },
      { text: 'Synchronous full-text indexing inside the answer write transaction' },
    ],
    explanation: 'Asynchronous consumers keep the write path fast while still enforcing quality.',
  },
])
