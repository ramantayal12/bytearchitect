import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which question does system analysis primarily answer?',
    options: [
      { text: 'What does the system need to do, and why?', correct: true },
      { text: 'Which database engine should we use?' },
      { text: 'How many shards do we need?' },
    ],
    explanation: 'Analysis focuses on the problem; design focuses on the solution.',
  },
  {
    prompt: 'Which SCALED step is essentially system analysis?',
    options: [{ text: 'Scope', correct: true }, { text: 'Layout' }, { text: 'Evolve' }],
    explanation: 'Scoping clarifies users, features and constraints.',
  },
  {
    prompt:
      'A design debate keeps stalling on whether eventual consistency is acceptable. What is often the best next step?',
    options: [
      { text: 'Return to analysis to clarify what the business actually requires', correct: true },
      { text: 'Pick the most popular database and move on' },
      { text: 'Add more servers' },
    ],
    explanation: 'Unclear requirements are a common cause of stalled design discussions.',
  },
])
