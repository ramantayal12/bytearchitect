import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which consistency model fits a user viewing their own newly posted answer?',
    options: [
      { text: 'Read-your-writes consistency', correct: true },
      { text: 'No consistency guarantee at all' },
      { text: 'Linearizability across all users worldwide' },
    ],
    explanation: 'Users must see their own posts immediately; others can see them slightly later.',
  },
  {
    prompt: 'Text storage is about 3 TB per year. What does that suggest?',
    options: [
      { text: 'Post text fits comfortably in a sharded relational database', correct: true },
      { text: 'Text must be stored in a blob store with erasure coding' },
      { text: 'Text storage is the main scaling challenge' },
    ],
    explanation: 'Text is small; traffic and ranking are the harder problems.',
  },
  {
    prompt:
      'Which optimization most reduces origin load for anonymous readers arriving from search engines?',
    options: [
      { text: 'Caching whole rendered question pages', correct: true },
      { text: 'Generating a personalized feed for each anonymous visitor' },
      { text: 'Disabling the CDN for question pages' },
    ],
    explanation: 'Anonymous visitors see the same page, so it can be cached and shared.',
  },
])
