import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'How does dynamic pricing help during a demand spike?',
    options: [
      { text: 'It reduces demand and attracts drivers from nearby areas', correct: true },
      { text: 'It speeds up the location index' },
      { text: 'It guarantees every rider is matched instantly' },
    ],
    explanation: 'Prices rebalance supply and demand in the affected cells.',
  },
  {
    prompt: 'The payment processor is down. What should happen to trips?',
    options: [
      {
        text: 'Trips continue and captures are queued and retried idempotently later',
        correct: true,
      },
      { text: 'All drivers are sent offline' },
      { text: 'Completed trips are cancelled' },
    ],
    explanation: 'Payment can lag; stranding riders is far worse.',
  },
  {
    prompt: 'What is the trade-off of batched matching compared with greedy matching?',
    options: [
      {
        text: 'A second or two of extra delay in exchange for better overall pickup times',
        correct: true,
      },
      { text: 'It risks assigning one driver to two trips' },
      { text: 'It requires riders to pay more' },
    ],
    explanation: 'Batching optimizes across riders at the cost of a short wait.',
  },
])
