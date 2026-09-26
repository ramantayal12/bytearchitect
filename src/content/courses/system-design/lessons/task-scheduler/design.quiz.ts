import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'How do scheduler workers find due tasks efficiently?',
    options: [
      { text: 'Query an index on next run time within their own partitions', correct: true },
      { text: 'Scan every task in the system every second' },
      { text: 'Wait for clients to trigger tasks manually' },
    ],
    explanation: 'Indexes and partitioning keep polling cheap.',
  },
  {
    prompt: 'What prevents two scheduler workers from enqueuing the same task occurrence?',
    options: [
      {
        text: 'A conditional update that changes state only if it is still SCHEDULED',
        correct: true,
      },
      { text: 'Running only one scheduler worker' },
      { text: 'Random delays' },
    ],
    explanation: 'Only one conditional update can succeed.',
  },
  {
    prompt: 'What happens when an executor running a task crashes?',
    options: [
      { text: 'Its lease expires and the task is returned for retry', correct: true },
      { text: 'The task is lost' },
      { text: 'The task is marked successful' },
    ],
    explanation: 'Leases with heartbeats detect dead executors.',
  },
])
