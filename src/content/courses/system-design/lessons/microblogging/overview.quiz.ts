import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the main cost of fan-out on write for an account with 50 million followers?',
    options: [
      { text: 'Each post requires about 50 million timeline inserts', correct: true },
      { text: 'Each reader must perform 50 million lookups' },
      { text: 'Posts cannot be stored' },
    ],
    explanation: 'Push multiplies writes by follower count.',
  },
  {
    prompt: 'What is the main cost of fan-out on read?',
    options: [
      {
        text: 'Every timeline refresh must fetch and merge posts from each followed account',
        correct: true,
      },
      { text: 'Every post must be copied into every follower’s timeline' },
      { text: 'Posts cannot be deleted' },
    ],
    explanation: 'Pull shifts the work from writes to reads.',
  },
  {
    prompt: 'Why do most microblogging systems use a hybrid fan-out approach?',
    options: [
      {
        text: 'Push is efficient for ordinary accounts, while pull avoids huge write amplification for celebrities',
        correct: true,
      },
      { text: 'Hybrids avoid the need for storage' },
      { text: 'Pull is always faster than push' },
    ],
    explanation:
      'The skewed follower distribution favors different strategies for different authors.',
  },
])
