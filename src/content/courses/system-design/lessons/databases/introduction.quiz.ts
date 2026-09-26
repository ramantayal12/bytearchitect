import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Which ACID property ensures a money transfer never debits one account without crediting the other?',
    options: [{ text: 'Atomicity', correct: true }, { text: 'Isolation' }, { text: 'Durability' }],
    explanation: 'Atomicity makes all operations in a transaction succeed or fail together.',
  },
  {
    prompt: 'Which storage structure is typically optimized for very high write throughput?',
    options: [{ text: 'B-tree' }, { text: 'LSM tree', correct: true }, { text: 'Linked list' }],
    explanation: 'LSM trees turn random writes into sequential appends and background merges.',
  },
  {
    prompt: 'What is the purpose of a write-ahead log?',
    options: [
      { text: 'To let the database recover to a consistent state after a crash', correct: true },
      { text: 'To speed up full-text search' },
      { text: 'To compress data on disk' },
    ],
    explanation:
      'Changes are appended to the log before being applied, so they can be replayed after a crash.',
  },
])
