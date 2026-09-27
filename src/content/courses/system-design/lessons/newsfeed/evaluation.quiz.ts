import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'If the ranking service is down, what is a sensible fallback for the feed?',
    options: [
      { text: 'Serve candidates with a lightweight model or in recency order', correct: true },
      { text: 'Return an empty feed until ranking recovers' },
      { text: 'Show posts without checking whether they were deleted' },
    ],
    explanation: 'A degraded feed is better than none, but integrity checks still apply.',
  },
  {
    prompt: 'Which are trade-offs made by the newsfeed design?',
    options: [
      { text: 'Push versus pull fan-out', correct: true },
      { text: 'Ranking quality versus latency and compute cost', correct: true },
      { text: 'Freshness versus a stable scrolling order', correct: true },
      { text: 'Strong consistency of like counts versus availability of posting' },
    ],
    explanation:
      'The first three are central; like counts are eventually consistent and do not block posting.',
  },
  {
    prompt: 'How are celebrity pages protected from causing fan-out storms during spikes?',
    options: [
      {
        text: 'Their posts are not pushed; they are pulled at read time from a hot cache',
        correct: true,
      },
      { text: 'They are rate limited to one post per day' },
      { text: 'Their followers are sharded onto a single server' },
    ],
    explanation: 'The hybrid approach keeps very large audiences on the pull path.',
  },
])
