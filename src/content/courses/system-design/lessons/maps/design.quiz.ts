import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'How many tiles cover the world at zoom level 2 in the standard tiling scheme?',
    options: [{ text: '4' }, { text: '16', correct: true }, { text: '8' }],
    explanation: 'Each zoom level multiplies the tile count by four: 1, 4, 16.',
  },
  {
    prompt: 'What does map matching do?',
    options: [
      { text: 'Aligns noisy GPS pings to the most likely road segments', correct: true },
      { text: 'Chooses the map style for the client' },
      { text: 'Matches place names to search queries' },
    ],
    explanation: 'GPS is imprecise, so pings must be snapped to plausible roads.',
  },
  {
    prompt: 'Which edge weights should routing use for a long trip?',
    options: [
      {
        text: 'Live traffic for nearby segments and historical speeds for segments reached later',
        correct: true,
      },
      { text: 'Only the posted speed limits' },
      { text: 'Only live traffic for every segment, regardless of arrival time' },
    ],
    explanation: 'Conditions an hour away are better predicted by history than by current traffic.',
  },
])
