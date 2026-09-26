import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      '200 million searches per day with a 3× peak factor corresponds to roughly how many queries per second at peak?',
    options: [{ text: '600' }, { text: '6,000', correct: true }, { text: '60,000' }],
    explanation: '2 × 10^8 / 10^5 = 2,000 average; × 3 = 6,000.',
  },
  {
    prompt: 'Why must the search index be partitioned in this scenario?',
    options: [
      { text: 'It is too large to fit on one machine', correct: true },
      { text: 'Partitioning improves relevance' },
      { text: 'Replication is impossible otherwise' },
    ],
    explanation: 'Terabytes of index require spreading across machines.',
  },
  {
    prompt: 'Which signals help measure search quality?',
    options: [
      { text: 'Click-through rate on top results', correct: true },
      { text: 'Query reformulation rate', correct: true },
      { text: 'CPU usage of index servers' },
    ],
    explanation: 'CPU usage measures efficiency, not relevance.',
  },
])
