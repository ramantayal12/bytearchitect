import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which store best fits shopping carts that must stay available during failures?',
    options: [
      { text: 'A highly available key-value store', correct: true },
      { text: 'A single relational database server' },
      { text: 'A blob store' },
    ],
    explanation: 'Carts are keyed by user and must accept writes even during partial failures.',
  },
  {
    prompt: 'Which e-commerce operations most need strong consistency?',
    options: [
      { text: 'Reserving inventory when placing an order', correct: true },
      { text: 'Recording that an order was paid', correct: true },
      { text: 'Updating the view count on a product page' },
    ],
    explanation: 'View counts tolerate eventual consistency; inventory and payments do not.',
  },
  {
    prompt: 'How should confirmation emails be sent after checkout?',
    options: [
      { text: 'Asynchronously via pub-sub or a queue after the order is committed', correct: true },
      { text: 'Synchronously before responding to the user' },
      { text: 'By the CDN' },
    ],
    explanation: 'Email is slow and non-critical to the checkout response.',
  },
])
