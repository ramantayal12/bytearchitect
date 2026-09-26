import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'When does the primary acknowledge a send in the majority-replication scheme?',
    options: [
      { text: 'After a majority of replicas have persisted the message', correct: true },
      { text: 'Immediately on receipt, before persisting' },
      { text: 'Only after every consumer has processed it' },
    ],
    explanation: 'Majority persistence ensures durability even if one replica fails.',
  },
  {
    prompt: 'What does long polling improve?',
    options: [
      { text: 'Reduces empty receive responses and wasted requests', correct: true },
      { text: 'Guarantees exactly-once delivery' },
      { text: 'Increases message size limits' },
    ],
    explanation: 'The call waits for messages instead of returning empty immediately.',
  },
  {
    prompt: 'How is per-key ordering preserved when a queue is partitioned?',
    options: [
      { text: 'Messages with the same group key are hashed to the same partition', correct: true },
      { text: 'All messages go to partition 0' },
      { text: 'Consumers sort messages after receiving them' },
    ],
    explanation: 'A partition is consumed in order, so same-key messages stay ordered.',
  },
])
