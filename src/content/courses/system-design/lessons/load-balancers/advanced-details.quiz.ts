import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Which algorithm is best suited to long-lived connections of widely varying duration, such as WebSockets?',
    options: [
      { text: 'Round robin' },
      { text: 'Least connections', correct: true },
      { text: 'Random' },
    ],
    explanation:
      'Least connections accounts for how many connections each server is already handling.',
  },
  {
    prompt: 'What problem does the “power of two random choices” approach avoid?',
    options: [
      {
        text: 'Herding, where every balancer sends traffic to the same least-loaded server',
        correct: true,
      },
      { text: 'TLS handshake overhead' },
      { text: 'DNS caching delays' },
    ],
    explanation:
      'Randomly sampling two servers spreads decisions while still favoring lightly loaded servers.',
  },
  {
    prompt: 'Which practices make removing or adding servers safer?',
    options: [
      { text: 'Connection draining', correct: true },
      { text: 'Slow start for new servers', correct: true },
      { text: 'Immediately sending full traffic to a cold server' },
    ],
    explanation: 'A cold server flooded with traffic may fail before warming its caches.',
  },
])
