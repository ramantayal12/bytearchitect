import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which HTTP method is not idempotent by default?',
    options: [{ text: 'POST', correct: true }, { text: 'PUT' }, { text: 'DELETE' }],
    explanation: 'POST needs an idempotency key to make retries safe.',
  },
  {
    prompt: 'Why is cursor pagination preferred for large, changing collections?',
    options: [
      {
        text: 'Offsets can skip or repeat items when data is inserted or deleted between pages',
        correct: true,
      },
      { text: 'Cursors make responses larger' },
      { text: 'Offsets are not supported by HTTP' },
    ],
    explanation: 'Cursors anchor pagination to a stable position.',
  },
  {
    prompt: 'Which topics are central to an API design interview?',
    multi: true,
    options: [
      { text: 'Error models and status codes', correct: true },
      { text: 'Versioning and backward compatibility', correct: true },
      { text: 'Resource naming and relationships', correct: true },
      { text: 'Choosing the number of database shards' },
    ],
    explanation: 'Shard counts are a system design concern.',
  },
])
