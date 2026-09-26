import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'What consistency does a cache-aside distributed cache typically provide relative to the database?',
    options: [
      { text: 'Linearizability' },
      { text: 'Eventual consistency bounded by TTLs and invalidation', correct: true },
      { text: 'No consistency at all' },
    ],
    explanation: 'Invalidation and TTLs keep staleness brief but not zero.',
  },
  {
    prompt: 'How should cache size be estimated?',
    options: [
      { text: 'From the working set — data accessed within a typical period', correct: true },
      { text: 'Always equal to the full database size' },
      { text: 'As small as possible regardless of hit ratio' },
    ],
    explanation: 'Caching the working set yields a high hit ratio at reasonable cost.',
  },
  {
    prompt: 'Which practices help control the cost of a distributed cache?',
    options: [
      { text: 'Stop caching data with low hit ratios', correct: true },
      { text: 'Compress large values', correct: true },
      { text: 'Set very long TTLs on rarely read data' },
    ],
    explanation: 'Long TTLs on cold data waste expensive memory.',
  },
])
