import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'How can low-priority tasks be protected from starvation?',
    options: [
      { text: 'Aging — gradually increasing the priority of waiting tasks', correct: true },
      { text: 'Reserving a minimum share of capacity for low priority', correct: true },
      { text: 'Always running high-priority tasks first with no exceptions' },
    ],
    explanation: 'Strict priority can starve low-priority work indefinitely.',
  },
  {
    prompt: 'Which errors should generally not be retried?',
    options: [
      { text: 'Invalid input that will fail the same way every time', correct: true },
      { text: 'Network timeouts' },
      { text: 'Temporary throttling by a dependency' },
    ],
    explanation: 'Permanent errors waste resources when retried.',
  },
  {
    prompt: 'What problem do fencing tokens solve?',
    options: [
      {
        text: 'Rejecting writes from a stale attempt that was presumed dead but is still running',
        correct: true,
      },
      { text: 'Encrypting task payloads' },
      { text: 'Choosing task priority' },
    ],
    explanation: 'Increasing tokens let downstream systems ignore zombie attempts.',
  },
])
