import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What happens on a cache miss at an edge server?',
    options: [
      {
        text: 'The edge fetches the content from a parent cache or origin, caches it and returns it',
        correct: true,
      },
      { text: 'The user receives an error' },
      { text: 'The user is redirected to another website' },
    ],
    explanation: 'Misses are filled from upstream and cached for later requests.',
  },
  {
    prompt: 'Why do many sites use file names like app.3f9a2c.js?',
    options: [
      {
        text: 'The content hash changes when the file changes, so it can be cached for a long time without invalidation',
        correct: true,
      },
      { text: 'It encrypts the file' },
      { text: 'CDNs require random file names' },
    ],
    explanation: 'Versioned names make stale content impossible to request by accident.',
  },
  {
    prompt: 'What does a 304 Not Modified response allow?',
    options: [
      { text: 'Revalidating cached content without re-downloading it', correct: true },
      { text: 'Deleting content from the cache' },
      { text: 'Redirecting the user to the origin' },
    ],
    explanation: 'Conditional requests with ETag or Last-Modified save bandwidth.',
  },
])
