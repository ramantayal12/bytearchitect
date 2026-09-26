import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'If each gateway holds 100,000 connections, how many gateways are needed for 500 million concurrent connections?',
    options: [{ text: '500' }, { text: '5,000', correct: true }, { text: '50,000' }],
    explanation: '5 × 10⁸ ÷ 10⁵ = 5,000, before adding spare capacity.',
  },
  {
    prompt: 'Why is message search performed on the device rather than the server?',
    options: [
      {
        text: 'Message content is end-to-end encrypted, so the server cannot read it',
        correct: true,
      },
      { text: 'Servers cannot run search engines' },
      { text: 'Devices have more storage than servers' },
    ],
    explanation: 'Only the endpoints hold the decryption keys.',
  },
  {
    prompt: 'Which delivery semantics does a messaging app typically provide to users?',
    options: [
      {
        text: 'At-least-once delivery with deduplication, so each message is shown exactly once',
        correct: true,
      },
      { text: 'At-most-once delivery, accepting occasional loss' },
      { text: 'No guarantees' },
    ],
    explanation: 'Retries guarantee delivery; message IDs remove duplicates.',
  },
])
