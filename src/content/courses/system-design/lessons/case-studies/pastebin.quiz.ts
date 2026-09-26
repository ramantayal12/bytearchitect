import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why is paste content stored in an object store rather than in the metadata database?',
    options: [
      { text: 'Large blobs would bloat the database, slowing queries and backups', correct: true },
      { text: 'Object stores cannot hold metadata' },
      { text: 'Databases cannot store text' },
    ],
    explanation: 'Separating large content from small metadata keeps each store efficient.',
  },
  {
    prompt: 'How is "burn after reading" implemented safely?',
    options: [
      {
        text: 'The first read atomically marks the paste consumed, and the paste is never cached',
        correct: true,
      },
      { text: 'The paste is cached at the CDN for one day' },
      { text: 'The client deletes it after reading' },
    ],
    explanation: 'An atomic transition prevents two readers from both seeing it.',
  },
  {
    prompt: 'Why can public pastes be cached with a long time-to-live?',
    options: [
      { text: 'They are immutable once created', correct: true },
      { text: 'They never expire' },
      { text: 'CDNs ignore expiration' },
    ],
    explanation: 'Immutable content never needs invalidation, except on deletion.',
  },
])
