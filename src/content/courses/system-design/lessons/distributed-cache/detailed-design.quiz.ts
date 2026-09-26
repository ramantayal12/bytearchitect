import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'After updating the database, why is it usually safer to delete the cache entry than to update it?',
    options: [
      {
        text: 'Concurrent updates could write values into the cache in the wrong order',
        correct: true,
      },
      { text: 'Deleting is always faster than setting' },
      { text: 'Caches do not support updates' },
    ],
    explanation: 'Deletion forces the next reader to load the current value.',
  },
  {
    prompt: 'Which techniques help with hot keys?',
    options: [
      { text: 'Read replicas for the hot shard', correct: true },
      { text: 'Local near-caches in application servers', correct: true },
      { text: 'Splitting the key into several copies', correct: true },
      { text: 'Increasing the database’s disk size' },
    ],
    explanation: 'Disk size does not address concentrated read traffic.',
  },
  {
    prompt: 'Why is asynchronous replication acceptable for a cache?',
    options: [
      {
        text: 'Lost writes only cause cache misses; the database remains the source of truth',
        correct: true,
      },
      { text: 'Caches never fail' },
      { text: 'Synchronous replication is impossible in memory' },
    ],
    explanation: 'Cache data can always be reloaded.',
  },
])
