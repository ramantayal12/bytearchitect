import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'With 2.5 billion views per day, roughly how many views per second does the platform serve on average?',
    options: [
      { text: 'About 2,900' },
      { text: 'About 29,000', correct: true },
      { text: 'About 290,000' },
    ],
    explanation: '2.5 × 10⁹ divided by about 86,400 seconds is roughly 29,000 per second.',
  },
  {
    prompt: 'Which data can safely be eventually consistent on a video platform?',
    multi: true,
    options: [
      { text: 'View counts', correct: true },
      { text: 'Search results for newly published videos', correct: true },
      { text: 'Like counts', correct: true },
      { text: 'Whether an uploaded file has been durably stored before acknowledging the creator' },
    ],
    explanation: 'Durability of uploads is non-negotiable; counts and search freshness can lag.',
  },
  {
    prompt: 'What does the egress estimate of many terabits per second imply for the design?',
    options: [
      { text: 'Video must be served from a globally distributed CDN', correct: true },
      { text: 'A single powerful origin server is sufficient' },
      { text: 'Videos should be stored in the relational database' },
    ],
    explanation:
      'No single data center can serve that much bandwidth; edges close to viewers are required.',
  },
])
