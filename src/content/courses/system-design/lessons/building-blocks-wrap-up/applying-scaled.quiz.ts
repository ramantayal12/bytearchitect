import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the characteristic hard part of geospatial problems such as ride-hailing?',
    options: [
      { text: 'Spatial indexing and handling frequent location updates', correct: true },
      { text: 'Full-text search relevance' },
      { text: 'Video transcoding' },
    ],
    explanation:
      'Finding nearby entities efficiently while locations change constantly is the core challenge.',
  },
  {
    prompt: 'How should you handle a very broad prompt such as “design a video platform”?',
    options: [
      {
        text: 'Narrow the scope to a few core features and state what you are skipping',
        correct: true,
      },
      { text: 'Design every feature of the product in detail' },
      { text: 'Refuse the question' },
    ],
    explanation: 'Explicit scoping keeps the design achievable within the time limit.',
  },
  {
    prompt: 'For a payment system, where should most deep-dive time go?',
    options: [
      { text: 'Data model, transactions, idempotency and failure scenarios', correct: true },
      { text: 'CDN configuration' },
      { text: 'Image compression' },
    ],
    explanation: 'Correctness under failure dominates consistency-critical designs.',
  },
])
