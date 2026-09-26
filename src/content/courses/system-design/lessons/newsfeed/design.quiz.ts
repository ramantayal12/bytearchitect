import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What are the main stages of generating a ranked feed page?',
    options: [
      {
        text: 'Candidate retrieval, feature fetching, model ranking and business rules',
        correct: true,
      },
      { text: 'Encoding, packaging and CDN delivery' },
      { text: 'Sorting all posts ever made by time' },
    ],
    explanation: 'Ranking a few thousand candidates is tractable; ranking everything is not.',
  },
  {
    prompt: 'Why can a ranked feed not simply use "posts older than X" as its cursor?',
    options: [
      {
        text: 'Ranking reorders items, so time does not define their position in the feed',
        correct: true,
      },
      { text: 'Posts have no timestamps' },
      { text: 'Cursors are not allowed in feeds' },
    ],
    explanation: 'The session’s ranked list is stored and the cursor indexes into it.',
  },
  {
    prompt: 'What is the purpose of the feed events endpoint?',
    options: [
      {
        text: 'Collect implicit feedback such as impressions, clicks and hides for features and model training',
        correct: true,
      },
      { text: 'Publish new posts' },
      { text: 'Delete the user’s feed' },
    ],
    explanation: 'Interaction data continuously improves ranking.',
  },
])
