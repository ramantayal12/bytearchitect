import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which routing technique naturally spreads a DDoS attack across many PoPs?',
    options: [
      { text: 'Anycast', correct: true },
      { text: 'HTTP redirection' },
      { text: 'Periodic polling' },
    ],
    explanation: 'Each attacker’s traffic reaches its nearest PoP, distributing the attack.',
  },
  {
    prompt:
      'A product image with a wrong price is cached at every edge with a 24-hour TTL. What is the fastest fix?',
    options: [
      { text: 'Wait for the TTL to expire' },
      { text: 'Issue a purge for that URL through the CDN API', correct: true },
      { text: 'Increase the TTL' },
    ],
    explanation: 'Purges invalidate content across edges within seconds.',
  },
  {
    prompt: 'What is the main trade-off when choosing a TTL?',
    options: [
      { text: 'Longer TTLs raise hit ratios but increase staleness', correct: true },
      { text: 'Longer TTLs increase origin load' },
      { text: 'TTL has no effect on freshness' },
    ],
    explanation: 'Longer caching means fewer origin fetches but older content.',
  },
])
