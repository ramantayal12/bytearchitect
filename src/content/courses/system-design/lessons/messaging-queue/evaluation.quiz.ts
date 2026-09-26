import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which metric is usually the first sign that consumers cannot keep up?',
    options: [
      { text: 'Growing queue depth and age of the oldest message', correct: true },
      { text: 'Front-end CPU usage' },
      { text: 'Number of queues created' },
    ],
    explanation: 'A backlog means messages arrive faster than they are processed.',
  },
  {
    prompt: 'What does the standard (non-FIFO) queue trade for higher throughput and availability?',
    options: [
      { text: 'Strict ordering', correct: true },
      { text: 'Durability of acknowledged messages' },
      { text: 'Authentication' },
    ],
    explanation: 'Standard queues offer best-effort ordering and at-least-once delivery.',
  },
  {
    prompt: 'How does the design keep acknowledged messages safe if a server fails?',
    options: [
      {
        text: 'Messages are persisted on a majority of replicas in different zones before acknowledgment',
        correct: true,
      },
      { text: 'Messages are kept only in memory' },
      { text: 'Producers resend every message twice' },
    ],
    explanation: 'Majority replication survives the loss of a minority of replicas.',
  },
])
