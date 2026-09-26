import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which metric best reveals that the scheduler lacks capacity?',
    options: [
      { text: 'Scheduling delay — actual start time minus scheduled time', correct: true },
      { text: 'Number of API servers' },
      { text: 'Size of task payloads' },
    ],
    explanation: 'Growing delay means tasks wait longer for executors.',
  },
  {
    prompt: 'What happens to a failed scheduler worker’s partitions?',
    options: [
      { text: 'They are reassigned to other scheduler workers', correct: true },
      { text: 'Their tasks are deleted' },
      { text: 'They stop running until the worker is repaired manually' },
    ],
    explanation: 'Lease-based ownership lets other workers take over.',
  },
  {
    prompt: 'What is the cost of at-least-once execution?',
    options: [
      { text: 'Task handlers must be idempotent to tolerate duplicates', correct: true },
      { text: 'Tasks may be lost' },
      { text: 'Tasks can never be retried' },
    ],
    explanation: 'Duplicates are possible; loss is not.',
  },
])
