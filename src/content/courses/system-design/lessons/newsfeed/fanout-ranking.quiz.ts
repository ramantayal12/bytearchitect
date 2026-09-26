import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why does ranking run in multiple stages?',
    options: [
      {
        text: 'A heavy model is too slow to score thousands of candidates per request, so cheaper stages trim the set first',
        correct: true,
      },
      { text: 'Each stage uses a different database' },
      { text: 'Multiple stages guarantee chronological order' },
    ],
    explanation:
      'Cheap filters reduce candidates so the expensive model runs on only a few hundred.',
  },
  {
    prompt:
      'How are deleted posts kept out of feeds without removing IDs from millions of inboxes?',
    options: [
      {
        text: 'Hydration checks each candidate’s current state and the viewer’s permissions',
        correct: true,
      },
      { text: 'Deleted posts remain visible forever' },
      { text: 'Every inbox is rebuilt from scratch after each deletion' },
    ],
    explanation: 'Filtering at read time is far cheaper than a reverse fan-out.',
  },
  {
    prompt: 'Which statements about the ranking score are true?',
    multi: true,
    options: [
      { text: 'It combines predicted probabilities of several actions', correct: true },
      { text: 'Its weights encode product goals such as meaningful interactions', correct: true },
      { text: 'Predicted hides reduce the score', correct: true },
      { text: 'It depends only on the post’s age' },
    ],
    explanation: 'Freshness is one feature among many.',
  },
])
