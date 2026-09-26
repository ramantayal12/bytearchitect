import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      '3 million online drivers each send a location every 4 seconds. About how many updates per second is that?',
    options: [{ text: '75,000' }, { text: '750,000', correct: true }, { text: '12 million' }],
    explanation: '3,000,000 ÷ 4 = 750,000 updates per second.',
  },
  {
    prompt: 'Why is city or region a natural partition key for matching?',
    options: [
      {
        text: 'Trips are local, so riders are only matched with drivers in the same area',
        correct: true,
      },
      { text: 'Every city has the same number of drivers' },
      { text: 'Payments are processed per city' },
    ],
    explanation: 'Locality means partitions rarely need to coordinate.',
  },
  {
    prompt: 'Which parts of the system need strong consistency?',
    multi: true,
    options: [
      { text: 'Assigning a driver to a trip', correct: true },
      { text: 'Charging the rider', correct: true },
      { text: 'Showing nearby cars on the rider’s map before a request' },
    ],
    explanation: 'The nearby-car map can be approximate; assignment and payment cannot.',
  },
])
