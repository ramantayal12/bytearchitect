import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which metric best captures how effective a CDN cache is?',
    options: [
      { text: 'Cache hit ratio', correct: true },
      { text: 'Number of PoPs' },
      { text: 'Origin CPU usage' },
    ],
    explanation: 'The hit ratio measures how many requests are served without going upstream.',
  },
  {
    prompt:
      'A news site has millions of articles, and it is impossible to predict which will become popular. Which model fits best?',
    options: [{ text: 'Push' }, { text: 'Pull', correct: true }, { text: 'No CDN' }],
    explanation: 'Pull caches only what users actually request.',
  },
  {
    prompt: 'Which techniques keep cached content consistent with the origin?',
    options: [
      { text: 'TTL expiration', correct: true },
      { text: 'Purge APIs', correct: true },
      { text: 'Versioned URLs', correct: true },
      { text: 'Anycast routing' },
    ],
    explanation: 'Anycast affects routing, not freshness.',
  },
  {
    prompt: 'What is a thundering herd in the context of CDNs?',
    options: [
      {
        text: 'Many simultaneous cache misses for the same object overwhelming upstream servers',
        correct: true,
      },
      { text: 'Too many PoPs in one city' },
      { text: 'A DNS misconfiguration' },
    ],
    explanation: 'Request coalescing mitigates it.',
  },
  {
    prompt: 'Why can CDNs speed up uncacheable, personalized responses?',
    options: [
      {
        text: 'Edges terminate TLS near users and reuse warm connections to the origin',
        correct: true,
      },
      { text: 'Edges cache personalized pages for all users' },
      { text: 'They cannot speed them up at all' },
    ],
    explanation:
      'Connection optimization and backbone routing reduce latency even without caching.',
  },
  {
    prompt: 'What is the role of a parent cache tier?',
    options: [
      { text: 'Reduce origin load by consolidating misses from many edges', correct: true },
      { text: 'Route users to the nearest PoP' },
      { text: 'Filter DDoS traffic' },
    ],
    explanation: 'Routing and scrubbing are handled by other components.',
  },
  {
    prompt: 'Which HTTP header lets an origin set a TTL specifically for shared caches like CDNs?',
    options: [
      { text: 'Cache-Control: s-maxage', correct: true },
      { text: 'Content-Type' },
      { text: 'Accept-Encoding' },
    ],
    explanation: 's-maxage applies to shared caches and overrides max-age for them.',
  },
])
