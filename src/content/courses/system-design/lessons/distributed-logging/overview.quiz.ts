import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why are local log files insufficient in containerized environments?',
    options: [
      {
        text: 'Containers are short-lived, and their local logs disappear when they are destroyed',
        correct: true,
      },
      { text: 'Containers cannot write files' },
      { text: 'Local logs are always encrypted' },
    ],
    explanation: 'Logs must be shipped off the host before it disappears.',
  },
  {
    prompt: 'Which are common uses of logs?',
    options: [
      { text: 'Debugging specific requests', correct: true },
      { text: 'Security auditing', correct: true },
      { text: 'Serving user traffic' },
    ],
    explanation: 'Logs record behavior; they do not serve traffic.',
  },
  {
    prompt: 'Why must logging have low overhead?',
    options: [
      { text: 'It runs inside every service and must not slow down requests', correct: true },
      { text: 'Logs are rarely used' },
      { text: 'Storage is free' },
    ],
    explanation: 'Heavy logging on the request path hurts latency.',
  },
])
