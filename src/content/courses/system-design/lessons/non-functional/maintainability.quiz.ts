import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which practices improve operability?',
    options: [
      { text: 'Exposing metrics, logs and traces', correct: true },
      { text: 'Supporting quick rollbacks and feature flags', correct: true },
      { text: 'Requiring downtime for every configuration change' },
    ],
    explanation:
      'Operable systems are observable and support safe routine changes without downtime.',
  },
  {
    prompt: 'What is the main tool for fighting accidental complexity?',
    options: [
      { text: 'Adding more services' },
      { text: 'Good abstractions with clear responsibilities and interfaces', correct: true },
      { text: 'Writing longer documentation' },
    ],
    explanation:
      'Well-defined components hide details and reduce the knowledge needed to make changes.',
  },
  {
    prompt: 'Why version APIs and data schemas?',
    options: [
      { text: 'So producers and consumers can evolve independently', correct: true },
      { text: 'To make requests faster' },
      { text: 'Because databases require it' },
    ],
    explanation: 'Versioning enables gradual, decoupled change — a key part of evolvability.',
  },
])
