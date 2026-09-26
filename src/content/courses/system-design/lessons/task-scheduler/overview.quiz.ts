import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why is a single cron server inadequate for critical scheduled jobs at scale?',
    options: [
      { text: 'It is a single point of failure', correct: true },
      { text: 'It lacks built-in retries and visibility', correct: true },
      { text: 'Its capacity is limited to one machine', correct: true },
      { text: 'Cron cannot run jobs at specific times' },
    ],
    explanation: 'Cron can schedule by time; its problems are reliability and scale.',
  },
  {
    prompt: 'Why should task code be idempotent?',
    options: [
      { text: 'At-least-once execution means a task may run more than once', correct: true },
      { text: 'Idempotent tasks run faster' },
      { text: 'Schedulers reject non-idempotent tasks' },
    ],
    explanation: 'Retries after ambiguous failures can duplicate execution.',
  },
  {
    prompt: 'Which is an example of a recurring task?',
    options: [
      { text: 'Generate a sales report every day at 02:00', correct: true },
      { text: 'Send one welcome email right after sign-up' },
      { text: 'Serve a web page' },
    ],
    explanation: 'Recurring tasks run on a schedule.',
  },
])
