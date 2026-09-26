import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'One customer submits 10 million messages at once. How does the platform keep other customers’ messages timely?',
    options: [
      { text: 'Per-tenant queues with weighted fair dispatching', correct: true },
      { text: 'A single shared first-in, first-out queue' },
      { text: 'Rejecting all other customers until the batch finishes' },
    ],
    explanation: 'Fair queuing gives each tenant a share of throughput.',
  },
  {
    prompt: 'What should the routing engine do when a carrier’s delivery success rate drops?',
    options: [
      { text: 'Shift traffic to healthier carriers for those destinations', correct: true },
      { text: 'Continue sending everything to that carrier' },
      { text: 'Stop sending all messages worldwide' },
    ],
    explanation: 'Health-based routing works like load balancing across carriers.',
  },
  {
    prompt: 'Why are webhooks signed and retried with backoff?',
    options: [
      {
        text: 'Customers can verify authenticity, and temporary endpoint failures do not lose updates',
        correct: true,
      },
      { text: 'Signing makes webhooks faster' },
      { text: 'Retries are required to deliver SMS' },
    ],
    explanation: 'Reliable, verifiable notifications build trust in status reporting.',
  },
])
