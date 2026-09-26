import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Why are messages ordered by server-assigned sequence numbers rather than sender timestamps?',
    options: [
      {
        text: 'Device clocks are unreliable, and sequence numbers give one agreed order per conversation',
        correct: true,
      },
      { text: 'Timestamps cannot be stored in databases' },
      { text: 'Sequence numbers are encrypted' },
    ],
    explanation: 'A single writer per conversation assigns a consistent order.',
  },
  {
    prompt:
      'A client retries sending a message after a timeout, but the first attempt was stored. How is a duplicate avoided?',
    options: [
      { text: 'The server deduplicates using the client-generated message ID', correct: true },
      { text: 'The recipient is asked which copy to keep' },
      { text: 'Retries are forbidden' },
    ],
    explanation: 'Idempotent handling makes retries safe.',
  },
  {
    prompt: 'What does forward secrecy provided by a ratcheting protocol mean?',
    options: [
      {
        text: 'Compromising a current key does not reveal previously exchanged messages',
        correct: true,
      },
      { text: 'Messages are delivered faster' },
      { text: 'The server can read messages after they are delivered' },
    ],
    explanation: 'Keys change per message, so old keys cannot be derived from new ones.',
  },
])
