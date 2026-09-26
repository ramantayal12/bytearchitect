import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why is consistent hashing especially important for caches when nodes are added?',
    options: [
      {
        text: 'Only a small fraction of the cache goes cold, protecting the database from a flood of misses',
        correct: true,
      },
      { text: 'It makes values smaller' },
      { text: 'It guarantees zero misses' },
    ],
    explanation: 'Modulo hashing would remap nearly every key, causing a massive miss storm.',
  },
  {
    prompt: 'What is the main advantage of client-side routing over a proxy tier?',
    options: [
      { text: 'One fewer network hop, so lower latency', correct: true },
      { text: 'Fewer connections to cache nodes' },
      { text: 'No need for consistent hashing' },
    ],
    explanation: 'Proxies reduce connection counts but add a hop.',
  },
  {
    prompt: 'What does the configuration service provide?',
    options: [
      { text: 'The current list of healthy cache nodes', correct: true },
      { text: 'The cached values themselves' },
      { text: 'Database backups' },
    ],
    explanation: 'Clients use it to keep their view of the ring up to date.',
  },
])
