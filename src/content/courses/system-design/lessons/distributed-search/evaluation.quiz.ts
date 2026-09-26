import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why might a search system return partial results?',
    options: [
      { text: 'To stay fast and available when some shards are slow or down', correct: true },
      { text: 'To save storage' },
      { text: 'Because users prefer fewer results' },
    ],
    explanation: 'Partial results trade completeness for latency and availability.',
  },
  {
    prompt: 'Why should deletions and privacy changes be prioritized over new documents?',
    options: [
      {
        text: 'Showing private or removed content is far more harmful than a slight delay in indexing new content',
        correct: true,
      },
      { text: 'Deletions are faster to process' },
      { text: 'New documents do not need indexing' },
    ],
    explanation: 'Correctness for removals protects users and privacy.',
  },
  {
    prompt:
      'Which consistency model does the search index typically have relative to the source database?',
    options: [
      { text: 'Linearizable' },
      { text: 'Eventually consistent', correct: true },
      { text: 'Serializable' },
    ],
    explanation: 'Updates flow asynchronously through the indexing pipeline.',
  },
])
