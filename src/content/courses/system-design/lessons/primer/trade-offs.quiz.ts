import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which features should favor strong consistency?',
    multi: true,
    options: [
      { text: 'Payment balances', correct: true },
      { text: 'Seat inventory for ticket sales', correct: true },
      { text: 'Unique username registration', correct: true },
      { text: 'Like counts on posts' },
    ],
    explanation: 'Like counts tolerate eventual consistency.',
  },
  {
    prompt: 'What is the main cost of synchronous calls between services?',
    options: [
      {
        text: 'Availability becomes coupled: if a dependency fails, the caller fails too',
        correct: true,
      },
      { text: 'They are always slower than queues' },
      { text: 'They cannot return results' },
    ],
    explanation: 'Asynchronous designs decouple failure domains.',
  },
  {
    prompt: 'When is precomputation most attractive?',
    options: [
      {
        text: 'When results are read far more often than inputs change and slight staleness is acceptable',
        correct: true,
      },
      { text: 'When every read must reflect writes from the last millisecond' },
      { text: 'When results are read once and discarded' },
    ],
    explanation: 'Precomputed results amortize work across many reads.',
  },
])
