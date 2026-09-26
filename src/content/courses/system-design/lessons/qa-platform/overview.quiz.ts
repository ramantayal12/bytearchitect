import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'How are answers to a question typically ordered on a Q&A platform?',
    options: [
      {
        text: 'By a quality ranking based on votes, author credibility and engagement',
        correct: true,
      },
      { text: 'Strictly by the time they were posted' },
      { text: 'Alphabetically by author name' },
    ],
    explanation: 'Quality ranking surfaces the most useful answer first.',
  },
  {
    prompt: 'Why is the long tail of old questions a challenge?',
    options: [
      {
        text: 'Traffic is spread across millions of pages, so a small cache of hot items does not absorb it',
        correct: true,
      },
      { text: 'Old questions cannot be stored in a database' },
      { text: 'Search engines never link to old questions' },
    ],
    explanation:
      'Long-tail reads cause many cache misses, so the storage tier must serve them cheaply.',
  },
  {
    prompt: 'Why start with a simple design and evolve it in an interview?',
    options: [
      {
        text: 'It demonstrates reasoning about bottlenecks and gives natural points for deeper discussion',
        correct: true,
      },
      { text: 'Interviewers penalize any mention of sharding' },
      { text: 'Simple designs are always sufficient at scale' },
    ],
    explanation:
      'Showing how and why a design changes is more convincing than reciting a final architecture.',
  },
])
