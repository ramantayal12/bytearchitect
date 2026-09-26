import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the “buzzword architecture” trap?',
    options: [
      { text: 'Using too few components in a design' },
      { text: 'Adding many technologies without justifying why each is needed', correct: true },
      { text: 'Refusing to name any specific technologies' },
    ],
    explanation:
      'Each component should be tied to a requirement; unjustified components invite probing and expose gaps.',
  },
  {
    prompt: 'By roughly what point in the interview should you have a complete end-to-end design?',
    options: [
      { text: 'Within the first five minutes' },
      { text: 'Around the halfway mark', correct: true },
      { text: 'Only at the very end' },
    ],
    explanation: 'Having a complete simple design by mid-interview leaves time for deep dives.',
  },
  {
    prompt: 'How should you respond when the interviewer challenges one of your decisions?',
    options: [
      { text: 'Defend the decision firmly to show confidence' },
      {
        text: 'Treat the challenge as a new requirement and adapt the design, explaining the trade-off',
        correct: true,
      },
      { text: 'Immediately abandon the entire design' },
    ],
    explanation:
      'Challenges often test adaptability; adjusting while explaining trade-offs is the strongest response.',
  },
])
