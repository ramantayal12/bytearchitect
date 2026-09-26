import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Roughly how much downtime per year does 99.99% availability allow?',
    options: [
      { text: '8.8 hours' },
      { text: '52.6 minutes', correct: true },
      { text: '5.3 minutes' },
    ],
    explanation: '0.01% of a year is about 52.6 minutes.',
  },
  {
    prompt:
      'A request passes through three components in series, each 99.9% available. What is the approximate overall availability?',
    options: [{ text: '99.9%' }, { text: '99.7%', correct: true }, { text: '99.99%' }],
    explanation: '0.999 × 0.999 × 0.999 ≈ 0.997.',
  },
  {
    prompt: 'Why might two replicas fail to improve availability as expected?',
    options: [
      {
        text: 'Their failures are correlated, for example sharing the same rack or power supply',
        correct: true,
      },
      { text: 'Replicas always reduce availability' },
      { text: 'Load balancers cannot route to more than one replica' },
    ],
    explanation: 'Redundancy helps only when failures are independent.',
  },
  {
    prompt: 'What is an error budget?',
    options: [
      { text: 'The money set aside for outages' },
      {
        text: 'The allowed amount of unreliability implied by an SLO, used to balance speed and stability',
        correct: true,
      },
      { text: 'The number of bugs allowed in a release' },
    ],
    explanation: 'For a 99.95% SLO, the 0.05% of failed requests allowed is the error budget.',
  },
])
