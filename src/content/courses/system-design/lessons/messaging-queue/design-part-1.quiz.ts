import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which responsibilities belong to the stateless front-end servers?',
    options: [
      { text: 'Authentication and authorization', correct: true },
      { text: 'Rate limiting', correct: true },
      { text: 'Routing requests to the owning back-end cluster', correct: true },
      { text: 'Permanently storing message payloads' },
    ],
    explanation: 'Message storage is the back end’s job.',
  },
  {
    prompt: 'Why is the metadata store fronted by a cache?',
    options: [
      { text: 'Front ends read queue metadata on every request', correct: true },
      { text: 'The metadata store cannot store data durably' },
      { text: 'To hold message payloads' },
    ],
    explanation: 'Caching avoids a database lookup for every message.',
  },
  {
    prompt: 'What is a problem with hosting all queues on a single server?',
    options: [
      { text: 'A noisy queue can slow every other queue', correct: true },
      { text: 'Messages are always delivered out of order' },
      { text: 'It requires too many front ends' },
    ],
    explanation: 'There is no isolation between tenants.',
  },
])
