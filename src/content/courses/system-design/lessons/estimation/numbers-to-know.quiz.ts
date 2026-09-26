import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Roughly how many requests per second does 1 million requests per day correspond to on average?',
    options: [{ text: 'About 1' }, { text: 'About 12', correct: true }, { text: 'About 1,000' }],
    explanation: '1,000,000 / 86,400 ≈ 11.6 requests per second.',
  },
  {
    prompt: 'Which is the slowest operation?',
    options: [
      { text: 'Main memory reference' },
      { text: 'Round trip within a data center' },
      { text: 'Round trip between continents', correct: true },
    ],
    explanation: 'Cross-continent round trips take on the order of 100–150 ms.',
  },
  {
    prompt: 'Why do systems place caches in memory in front of databases?',
    options: [
      { text: 'Memory access is orders of magnitude faster than disk access', correct: true },
      { text: 'Memory is cheaper than disk' },
      { text: 'Databases cannot handle reads' },
    ],
    explanation:
      'Memory is roughly 100× faster than SSD and far faster than HDD, though more expensive per byte.',
  },
])
