import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Which database type is the best fit for storing billions of chat messages queried by conversation and time?',
    options: [
      { text: 'Graph database' },
      { text: 'Wide-column store', correct: true },
      { text: 'Single relational database without sharding' },
    ],
    explanation:
      'Wide-column stores partition by conversation and sort by time, supporting huge write volumes.',
  },
  {
    prompt: 'Which workloads suit a relational database particularly well?',
    options: [
      { text: 'Financial transactions requiring ACID guarantees', correct: true },
      {
        text: 'Order management with relationships between customers, orders and products',
        correct: true,
      },
      { text: 'Storing multi-gigabyte video files' },
    ],
    explanation:
      'Large files belong in a blob store; relational databases excel at transactional, related data.',
  },
  {
    prompt: 'What is polyglot persistence?',
    options: [
      {
        text: 'Using multiple database types, each for the workload it handles best',
        correct: true,
      },
      { text: 'Storing data in several languages' },
      { text: 'Replicating one database across regions' },
    ],
    explanation:
      'It optimizes each workload at the cost of operational complexity and data synchronization.',
  },
])
