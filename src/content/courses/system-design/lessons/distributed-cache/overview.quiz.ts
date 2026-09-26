import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is a key drawback of caching only within each application server?',
    options: [
      {
        text: 'Each server duplicates data and sees a different, possibly stale, copy',
        correct: true,
      },
      { text: 'Local memory is slower than network access' },
      { text: 'Local caches cannot use TTLs' },
    ],
    explanation: 'A shared distributed cache avoids duplication and inconsistency across servers.',
  },
  {
    prompt: 'Why can a cache favor availability and speed over durability?',
    options: [
      {
        text: 'It is not the source of truth; lost data can be rebuilt from the database',
        correct: true,
      },
      { text: 'Caches never lose data' },
      { text: 'Durability is not possible in memory' },
    ],
    explanation: 'Cache loss costs performance, not correctness.',
  },
  {
    prompt: 'Which benefits does a cache in front of a database provide?',
    options: [
      { text: 'Lower read latency', correct: true },
      { text: 'Reduced database load', correct: true },
      { text: 'Guaranteed strong consistency' },
      { text: 'Better handling of read spikes', correct: true },
    ],
    explanation: 'Caches can introduce staleness; they do not guarantee strong consistency.',
  },
])
