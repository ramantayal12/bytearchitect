import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What does debouncing do on the client?',
    options: [
      { text: 'Waits for a brief pause in typing before sending a request', correct: true },
      { text: 'Sends a request for every keystroke twice' },
      { text: 'Encrypts the prefix' },
    ],
    explanation: 'Fast typists produce fewer requests without noticeable delay.',
  },
  {
    prompt: 'Why can each serving replica hold the full suggestion dataset?',
    options: [
      { text: 'The trie of popular queries is only tens of gigabytes', correct: true },
      { text: 'Queries are never longer than three characters' },
      { text: 'The dataset is stored on a CDN' },
    ],
    explanation: 'About 100 million queries fit in memory with overhead.',
  },
  {
    prompt: 'Which signals can improve suggestion ranking beyond raw frequency?',
    multi: true,
    options: [
      { text: 'Freshness of spiking queries', correct: true },
      { text: 'Regional popularity', correct: true },
      { text: 'Whether the query leads to clicks', correct: true },
      { text: 'The length of the user’s password' },
    ],
    explanation: 'Recency, locality and result quality all help.',
  },
])
