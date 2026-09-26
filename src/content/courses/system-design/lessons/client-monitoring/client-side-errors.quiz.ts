import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'A DNS misconfiguration makes your site unreachable in one country. What would server-side metrics most likely show?',
    options: [
      { text: 'A spike in 500 errors' },
      { text: 'A drop in traffic from that country, with no errors', correct: true },
      { text: 'High CPU usage' },
    ],
    explanation: 'Requests never arrive, so servers see less traffic rather than errors.',
  },
  {
    prompt: 'What is an advantage of synthetic monitoring over real user monitoring?',
    options: [
      { text: 'It detects outages even when there is no real user traffic', correct: true },
      { text: 'It covers every device and network users have' },
      { text: 'It requires no configuration' },
    ],
    explanation: 'Probes run on a schedule regardless of user activity.',
  },
  {
    prompt: 'Which failures are typically invisible to server-side monitoring?',
    options: [
      { text: 'Mobile app crashes while rendering a response', correct: true },
      { text: 'ISP routing problems', correct: true },
      { text: 'A database running out of disk' },
    ],
    explanation: 'The database is inside our infrastructure and visible to server-side metrics.',
  },
])
