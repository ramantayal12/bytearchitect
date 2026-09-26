import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Which HTTP status code conventionally signals that a client has exceeded its rate limit?',
    options: [
      { text: '403 Forbidden' },
      { text: '429 Too Many Requests', correct: true },
      { text: '503 Service Unavailable' },
    ],
    explanation: '429 indicates the client should slow down, often with a Retry-After header.',
  },
  {
    prompt: 'Which are common reasons to rate limit?',
    options: [
      { text: 'Preventing one client from starving others', correct: true },
      { text: 'Slowing brute-force login attempts', correct: true },
      { text: 'Enforcing plan quotas', correct: true },
      { text: 'Making all requests faster' },
    ],
    explanation: 'Rate limiting protects capacity; it does not speed up requests.',
  },
  {
    prompt: 'Why apply coarse IP-based limits at the edge?',
    options: [
      { text: 'To stop floods cheaply before they reach inner services', correct: true },
      { text: 'Because the edge knows every user’s plan' },
      { text: 'To cache API responses' },
    ],
    explanation: 'Edge limits filter abusive traffic early.',
  },
])
