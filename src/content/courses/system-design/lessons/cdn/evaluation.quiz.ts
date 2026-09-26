import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why can adding more PoPs reduce each PoP’s cache hit ratio?',
    options: [
      {
        text: 'Requests are split across more locations, so each sees fewer repeats of the same object',
        correct: true,
      },
      { text: 'More PoPs make TTLs shorter' },
      { text: 'PoPs share a single cache' },
    ],
    explanation:
      'Spreading traffic thinly lowers the chance that an object is already cached locally.',
  },
  {
    prompt: 'What is the trade-off of serving stale content when the origin is down?',
    options: [
      { text: 'Higher availability, but users may see outdated content', correct: true },
      { text: 'Lower availability, but guaranteed fresh content' },
      { text: 'No trade-off' },
    ],
    explanation: 'Availability is favored over freshness.',
  },
  {
    prompt: 'Which features help protect private content served via a CDN?',
    options: [
      { text: 'Signed URLs or tokens', correct: true },
      { text: 'TLS encryption', correct: true },
      { text: 'Longer TTLs' },
    ],
    explanation: 'TTL length does not provide access control.',
  },
])
