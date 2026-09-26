import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why does Part II design each building block from scratch?',
    options: [
      { text: 'To replace open-source tools in production' },
      {
        text: 'So you understand how each component behaves under load and failure, not just what it does',
        correct: true,
      },
      { text: 'Because the design problems do not use building blocks' },
    ],
    explanation:
      'Knowing internal behavior lets you reason about bottlenecks and failures when combining components.',
  },
  {
    prompt: 'Which topics belong to Part I · Foundations?',
    options: [
      { text: 'Consistency and failure models', correct: true },
      { text: 'Back-of-the-envelope estimation', correct: true },
      { text: 'Designing a ride-hailing service' },
      { text: 'Non-functional characteristics such as availability', correct: true },
    ],
    explanation: 'Ride-hailing is one of the design problems in Part III.',
  },
  {
    prompt: 'How are design problems typically split across lessons?',
    options: [
      { text: 'Requirements, high-level design, detailed design and evaluation', correct: true },
      { text: 'Code, tests and deployment' },
      { text: 'A single lesson per problem with no structure' },
    ],
    explanation: 'The split mirrors how you would present a design in an interview.',
  },
])
