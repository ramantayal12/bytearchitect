import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'A composite index exists on (user_id, created_at). Which query can it serve efficiently?',
    options: [
      { text: 'Posts by a given user in a date range', correct: true },
      { text: 'All posts in a date range across every user' },
      { text: 'Posts whose title contains a word' },
    ],
    explanation: 'Composite indexes serve queries on a leftmost prefix of their columns.',
  },
  {
    prompt: 'Why do write-heavy stores often use LSM trees?',
    options: [
      {
        text: 'Writes are sequential appends to memory and immutable files, which are very fast',
        correct: true,
      },
      { text: 'LSM trees never need compaction' },
      { text: 'Reads always touch exactly one file' },
    ],
    explanation: 'Compaction and Bloom filters keep reads manageable.',
  },
  {
    prompt: 'What is the main cost of adding many indexes to a table?',
    options: [
      { text: 'Slower writes and more storage, since every index must be updated', correct: true },
      { text: 'Slower primary key lookups' },
      { text: 'Loss of durability' },
    ],
    explanation: 'Each write maintains every affected index.',
  },
])
