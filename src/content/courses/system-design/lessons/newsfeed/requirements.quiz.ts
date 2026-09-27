import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'With 1 billion daily users opening the feed 10 times a day, roughly how many feed requests per second is that on average?',
    options: [
      { text: 'About 11,500' },
      { text: 'About 115,000', correct: true },
      { text: 'About 1.15 million' },
    ],
    explanation: '10 billion requests ÷ 86,400 seconds ≈ 115,000 per second.',
  },
  {
    prompt: 'Why do feed inboxes store post IDs rather than post contents?',
    options: [
      {
        text: 'A post appears in many inboxes, so storing IDs keeps fan-out writes and memory small',
        correct: true,
      },
      { text: 'Post contents cannot be cached' },
      { text: 'IDs are required by the ranking model instead of content' },
    ],
    explanation: 'Content is stored once and hydrated at read time from a post cache.',
  },
  {
    prompt: 'Why is ranking staged so the heavy model sees only a few hundred candidates?',
    options: [
      {
        text: 'Scoring thousands of candidates per request with the heavy model would exceed the latency and compute budget',
        correct: true,
      },
      { text: 'Heavy models cannot score more than 100 items' },
      { text: 'Users only have a few hundred friends' },
    ],
    explanation:
      'At hundreds of thousands of requests per second, per-request model work must be bounded.',
  },
])
