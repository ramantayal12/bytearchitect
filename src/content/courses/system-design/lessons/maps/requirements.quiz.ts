import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      '50 million navigating devices send a ping every 5 seconds. How many pings per second is that?',
    options: [
      { text: '1 million' },
      { text: '10 million', correct: true },
      { text: '250 million' },
    ],
    explanation: '50,000,000 ÷ 5 = 10,000,000 pings per second.',
  },
  {
    prompt: 'Which workload is best handled by a CDN?',
    options: [
      { text: 'Map tile requests', correct: true },
      { text: 'Route computation with live traffic' },
      { text: 'Location ping ingestion' },
    ],
    explanation: 'Tiles are shared, cacheable and change slowly.',
  },
  {
    prompt: 'Why should the navigation client keep guiding the user if the network drops?',
    options: [
      {
        text: 'Navigation is used while driving and must be dependable even with poor connectivity',
        correct: true,
      },
      { text: 'The server cannot compute routes' },
      { text: 'Tiles are only available offline' },
    ],
    explanation: 'The client already holds the route and can continue until connectivity returns.',
  },
])
