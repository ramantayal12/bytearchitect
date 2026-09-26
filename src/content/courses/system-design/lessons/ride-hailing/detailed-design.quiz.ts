import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'How does matching prevent two riders from being assigned the same driver?',
    options: [
      {
        text: 'An atomic compare-and-set reserves the driver with a lease; only one attempt succeeds',
        correct: true,
      },
      { text: 'Riders are asked to coordinate with each other' },
      { text: 'Drivers are assigned randomly' },
    ],
    explanation:
      'Compare-and-set on the driver’s status is local to the city partition and race-free.',
  },
  {
    prompt: 'Why does the live driver index not need durable storage?',
    options: [
      {
        text: 'Positions go stale in seconds and are rebuilt from the continuous stream of updates',
        correct: true,
      },
      { text: 'Driver positions are never used' },
      { text: 'The index is stored in the payment database' },
    ],
    explanation: 'Durability matters for trip history, not for the latest ephemeral position.',
  },
  {
    prompt:
      'Why rank candidate drivers by estimated time to pickup rather than straight-line distance?',
    options: [
      {
        text: 'Roads, rivers and one-way streets can make a close driver slow to arrive',
        correct: true,
      },
      { text: 'Straight-line distance cannot be computed' },
      { text: 'ETA ranking is required by law' },
    ],
    explanation: 'Riders care about how long they wait, not how far the driver is.',
  },
])
