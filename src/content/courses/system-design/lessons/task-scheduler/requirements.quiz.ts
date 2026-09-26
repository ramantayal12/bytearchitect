import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why include an idempotency key when submitting a task?',
    options: [
      { text: 'Retried submissions do not create duplicate tasks', correct: true },
      { text: 'It encrypts the task payload' },
      { text: 'It sets the task priority' },
    ],
    explanation: 'The scheduler recognizes repeated submissions with the same key.',
  },
  {
    prompt: 'What causes the “top of the hour” spike in schedulers?',
    options: [
      { text: 'Many recurring tasks are scheduled for the same round time', correct: true },
      { text: 'Workers restart every hour' },
      { text: 'Clocks drift more at the top of the hour' },
    ],
    explanation: 'Adding jitter spreads tasks whose exact time does not matter.',
  },
  {
    prompt: 'What happens when a task has exhausted its retries?',
    options: [
      { text: 'It moves to a dead (failed permanently) state for inspection', correct: true },
      { text: 'It retries forever' },
      { text: 'It is silently deleted' },
    ],
    explanation: 'Dead tasks are surfaced so owners can investigate.',
  },
])
