import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which store best fits large immutable files such as videos?',
    options: [
      { text: 'Blob store', correct: true },
      { text: 'Graph database' },
      { text: 'Relational database rows' },
    ],
    explanation: 'Blob stores are designed for large binary objects.',
  },
  {
    prompt: 'With 3 replicas, which quorum settings guarantee reads overlap the latest write?',
    options: [
      { text: 'W = 2, R = 2', correct: true },
      { text: 'W = 1, R = 1' },
      { text: 'W = 1, R = 2' },
    ],
    explanation: 'W + R must exceed N: 2 + 2 = 4 > 3.',
  },
  {
    prompt: 'What does cache-aside mean?',
    options: [
      {
        text: 'The application checks the cache, falls back to the database on a miss and fills the cache',
        correct: true,
      },
      { text: 'The database writes to the cache automatically on every change' },
      { text: 'The cache is placed beside the load balancer' },
    ],
    explanation: 'The application manages cache population.',
  },
])
