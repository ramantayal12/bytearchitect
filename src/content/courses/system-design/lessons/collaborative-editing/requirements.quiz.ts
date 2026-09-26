import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why can each document’s operations be processed by a single server?',
    options: [
      {
        text: 'Each document has a low rate of operations, even though the total rate is huge',
        correct: true,
      },
      { text: 'Documents are never edited concurrently' },
      { text: 'Servers are infinitely fast' },
    ],
    explanation: 'Per-document load is small, so one server can order its operations.',
  },
  {
    prompt: 'Why is operation history compacted into periodic snapshots?',
    options: [
      {
        text: 'Storing every operation forever would grow storage by tens of terabytes per day',
        correct: true,
      },
      { text: 'Snapshots are required for presence' },
      { text: 'Operations cannot be replayed' },
    ],
    explanation: 'Snapshots plus recent operations balance history and cost.',
  },
  {
    prompt: 'Which latency expectation is correct?',
    options: [
      {
        text: 'A user’s own keystrokes appear instantly because they are applied locally',
        correct: true,
      },
      { text: 'A user’s own keystrokes appear after a full server round trip' },
      { text: 'Collaborators’ edits appear after several minutes' },
    ],
    explanation: 'Local application makes typing feel native.',
  },
])
