import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'How can a queue preserve order for each account while still processing many accounts in parallel?',
    options: [
      { text: 'Guarantee FIFO within a group key such as account ID', correct: true },
      { text: 'Use a single global FIFO sequence' },
      { text: 'Disable ordering entirely' },
    ],
    explanation:
      'Per-key ordering keeps related messages in sequence without serializing everything.',
  },
  {
    prompt: 'Acknowledging a message before processing it gives which semantics?',
    options: [
      { text: 'At most once', correct: true },
      { text: 'At least once' },
      { text: 'Exactly once' },
    ],
    explanation: 'If processing then fails, the message is already gone.',
  },
  {
    prompt: 'How is exactly-once processing typically achieved in practice?',
    options: [
      { text: 'At-least-once delivery combined with idempotent consumers', correct: true },
      { text: 'Sending each message exactly once over the network' },
      { text: 'Disabling retries' },
    ],
    explanation: 'Duplicates are detected and ignored by the consumer.',
  },
])
