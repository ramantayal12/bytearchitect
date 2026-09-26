import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the purpose of a visibility timeout?',
    options: [
      {
        text: 'Hide a received message from other consumers, and redeliver it if not acknowledged in time',
        correct: true,
      },
      { text: 'Delete messages after a fixed time' },
      { text: 'Delay sending messages' },
    ],
    explanation: 'It allows recovery from consumer crashes without losing messages.',
  },
  {
    prompt: 'Why must consumers be idempotent?',
    options: [
      { text: 'A message may be delivered more than once', correct: true },
      { text: 'Queues always deliver messages exactly once' },
      { text: 'Idempotency makes messages smaller' },
    ],
    explanation: 'Redelivery after timeouts can cause duplicate processing.',
  },
  {
    prompt: 'What is a dead-letter queue for?',
    options: [
      {
        text: 'Holding messages that repeatedly fail processing so they do not block others',
        correct: true,
      },
      { text: 'Storing deleted queues' },
      { text: 'Encrypting messages' },
    ],
    explanation: 'Poison messages are moved aside for inspection.',
  },
])
