import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why does a single database row struggle as a counter for a viral post?',
    options: [
      {
        text: 'Every increment contends for the same row lock, limiting throughput',
        correct: true,
      },
      { text: 'Rows cannot store large numbers' },
      { text: 'Databases do not support increments' },
    ],
    explanation: 'Contention on one hot row serializes all updates.',
  },
  {
    prompt: 'How is the total value of a sharded counter computed?',
    options: [
      { text: 'Sum of all shards', correct: true },
      { text: 'Maximum of all shards' },
      { text: 'Value of shard 1' },
    ],
    explanation: 'Each shard holds part of the count.',
  },
  {
    prompt: 'Why is a slightly delayed like count usually acceptable?',
    options: [
      { text: 'Users rarely notice small differences, and displays often round', correct: true },
      { text: 'Likes are not stored' },
      { text: 'Counts are never read' },
    ],
    explanation: 'Eventual accuracy is sufficient as long as increments are not lost.',
  },
])
