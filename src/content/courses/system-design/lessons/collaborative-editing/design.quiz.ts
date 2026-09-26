import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'What is the main benefit of routing all collaborators of a document to one session server?',
    options: [
      {
        text: 'It provides a single total order of operations without distributed consensus per keystroke',
        correct: true,
      },
      { text: 'It removes the need to store operations' },
      { text: 'It allows unlimited documents per server with no memory' },
    ],
    explanation: 'One owner orders operations simply and quickly.',
  },
  {
    prompt: 'Why does the server write periodic snapshots?',
    options: [
      {
        text: 'So opening a document loads a snapshot and replays only recent operations',
        correct: true,
      },
      { text: 'Because operations cannot be stored durably' },
      { text: 'To broadcast cursor positions' },
    ],
    explanation: 'Replaying the entire history would make opening slow.',
  },
  {
    prompt:
      'A session server crashes. What happens to edits the client sent but that were not acknowledged?',
    options: [
      {
        text: 'They remain in the client’s pending queue and are resent to the new owner',
        correct: true,
      },
      { text: 'They are permanently lost' },
      { text: 'They are applied twice' },
    ],
    explanation: 'Pending queues plus a durable log ensure nothing is lost.',
  },
])
