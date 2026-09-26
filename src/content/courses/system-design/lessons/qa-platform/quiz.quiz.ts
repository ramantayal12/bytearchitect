import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which characteristic best describes Q&A platform traffic?',
    options: [
      {
        text: 'Read-heavy, with many anonymous visitors arriving from search engines',
        correct: true,
      },
      { text: 'Write-heavy, with more answers than page views' },
      { text: 'Evenly balanced reads and writes' },
    ],
    explanation: 'Page views vastly outnumber posts and votes.',
  },
  {
    prompt: 'What prevents a user from voting on the same answer twice?',
    options: [
      {
        text: 'A uniqueness constraint or de-duplication store keyed by user and answer',
        correct: true,
      },
      { text: 'The CDN cache' },
      { text: 'Eventual consistency' },
    ],
    explanation: 'The (user, answer) key ensures one vote per user per answer.',
  },
  {
    prompt: 'Which changes move the Q&A platform from the initial to the final design?',
    multi: true,
    options: [
      { text: 'Sharding the database by question ID', correct: true },
      { text: 'Processing votes and side effects through an event stream', correct: true },
      { text: 'Precomputing feeds with a hybrid fan-out', correct: true },
      { text: 'Replacing the cache with synchronous database reads' },
    ],
    explanation: 'The final design adds sharding, asynchronous processing and precomputation.',
  },
  {
    prompt: 'For authors with millions of followers, why is fan-out on read preferred?',
    options: [
      {
        text: 'Fan-out on write would require millions of feed updates for each of their posts',
        correct: true,
      },
      { text: 'Their posts are never read' },
      { text: 'Fan-out on read is always faster for every user' },
    ],
    explanation:
      'Merging a few celebrity sources at read time is cheaper than writing to millions of feeds.',
  },
  {
    prompt:
      'How can a signed-in user get a cached question page while still seeing personalized elements?',
    options: [
      {
        text: 'Serve the shared cached page and load a small personalized fragment separately',
        correct: true,
      },
      { text: 'Disable caching for all signed-in users' },
      { text: 'Cache a separate full page per user at the edge' },
    ],
    explanation: 'Splitting shared and personalized parts preserves cache efficiency.',
  },
  {
    prompt: 'Which ranking inputs improve answer ordering beyond raw vote counts?',
    multi: true,
    options: [
      { text: 'Confidence adjustment for the number of votes', correct: true },
      { text: 'Author credibility on the topic', correct: true },
      { text: 'Engagement signals such as reading time', correct: true },
      { text: 'Length of the author’s username' },
    ],
    explanation: 'Quality signals and statistical confidence produce better rankings.',
  },
])
