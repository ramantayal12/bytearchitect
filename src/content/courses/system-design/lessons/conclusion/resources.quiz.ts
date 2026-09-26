import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What makes postmortems valuable learning material?',
    options: [
      {
        text: 'They show real triggers, amplifying mechanisms, recovery challenges and fixes',
        correct: true,
      },
      { text: 'They contain complete source code' },
      { text: 'They are always short' },
    ],
    explanation: 'Real failures teach how systems behave under stress.',
  },
  {
    prompt: 'Which practice habits are most effective?',
    multi: true,
    options: [
      { text: 'Timed solo practice aloud, followed by comparison with the lesson', correct: true },
      { text: 'Mock interviews with feedback', correct: true },
      { text: 'A journal of recurring mistakes', correct: true },
      { text: 'Reading as many designs as possible without practicing' },
    ],
    explanation: 'Active practice with feedback beats passive reading.',
  },
  {
    prompt: 'What should you do when unsure of a detail during an interview?',
    options: [
      { text: 'State an explicit assumption and continue', correct: true },
      { text: 'Stop and refuse to continue' },
      { text: 'Guess silently without mentioning it' },
    ],
    explanation: 'Explicit assumptions keep the discussion moving and transparent.',
  },
])
