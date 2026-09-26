import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why does decrementing one stock row per order fail at flash-sale scale?',
    options: [
      { text: 'Lock contention on the hot row limits throughput', correct: true },
      { text: 'Databases cannot store integers' },
      { text: 'Rows cannot be updated more than once' },
    ],
    explanation: 'All writers serialize on one row.',
  },
  {
    prompt: 'What does an atomic "decrement if greater than zero" in an in-memory store provide?',
    options: [
      { text: 'Fast reservations that can never drive stock below zero', correct: true },
      { text: 'Permanent storage of orders' },
      { text: 'Automatic refunds' },
    ],
    explanation: 'Atomicity prevents overselling; orders are persisted asynchronously.',
  },
  {
    prompt: 'Which actions are examples of graceful degradation during a sale?',
    multi: true,
    options: [
      { text: 'Turning off recommendations with feature flags', correct: true },
      { text: 'Rate limiting per user and IP', correct: true },
      { text: 'Queuing orders for asynchronous confirmation', correct: true },
      { text: 'Letting the checkout service crash' },
    ],
    explanation: 'Degradation preserves the core path instead of failing entirely.',
  },
])
