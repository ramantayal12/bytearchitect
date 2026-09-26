import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which operation must be most highly available in a URL shortener?',
    options: [
      { text: 'Redirecting a short URL to its long URL', correct: true },
      { text: 'Creating a new short URL' },
      { text: 'Viewing analytics' },
    ],
    explanation: 'Broken redirects break every link that was ever shared.',
  },
  {
    prompt: 'Approximately how many keys can seven base-62 characters represent?',
    options: [
      { text: '57 billion' },
      { text: '3.5 trillion', correct: true },
      { text: '218 trillion' },
    ],
    explanation: '62⁷ ≈ 3.52 × 10¹².',
  },
  {
    prompt: 'Why are sequential, guessable keys undesirable?',
    options: [
      {
        text: 'People could enumerate links, including ones meant to be shared privately',
        correct: true,
      },
      { text: 'Sequential keys are longer' },
      { text: 'Databases cannot store sequential keys' },
    ],
    explanation: 'Unpredictable keys prevent easy enumeration.',
  },
])
