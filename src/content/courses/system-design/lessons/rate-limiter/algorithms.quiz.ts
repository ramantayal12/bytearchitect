import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'A client sends 100 requests at 12:00:59 and 100 more at 12:01:00 under a 100-per-minute fixed window limit. What happens?',
    options: [
      { text: 'All 200 are allowed because they fall in different windows', correct: true },
      { text: 'Only 100 are allowed' },
      { text: 'All 200 are rejected' },
    ],
    explanation: 'This boundary burst is the main weakness of fixed windows.',
  },
  {
    prompt: 'Which algorithm produces a perfectly constant outflow rate?',
    options: [
      { text: 'Token bucket' },
      { text: 'Leaky bucket', correct: true },
      { text: 'Fixed window' },
    ],
    explanation: 'The leaky bucket processes queued requests at a fixed rate.',
  },
  {
    prompt: 'What does a token bucket need to store per key?',
    options: [
      { text: 'The current token count and the last refill time', correct: true },
      { text: 'A timestamp for every request' },
      { text: 'A queue of pending requests' },
    ],
    explanation: 'Tokens are refilled lazily based on elapsed time.',
  },
  {
    prompt: 'Why is the sliding window log expensive at scale?',
    options: [
      { text: 'It stores a timestamp for every request within the window', correct: true },
      { text: 'It requires a queue per key' },
      { text: 'It needs a global lock' },
    ],
    explanation: 'Memory grows with the limit and number of keys.',
  },
])
