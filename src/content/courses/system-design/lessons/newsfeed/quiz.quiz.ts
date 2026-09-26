import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'How does a newsfeed differ from a simple chronological timeline?',
    options: [
      { text: 'It mixes many sources and ranks items by predicted interest', correct: true },
      { text: 'It only shows posts from one author' },
      { text: 'It never changes after it is generated' },
    ],
    explanation: 'Ranking and diverse sources define a newsfeed.',
  },
  {
    prompt: 'Which sources can supply feed candidates?',
    multi: true,
    options: [
      { text: 'Pushed inbox entries from friends', correct: true },
      { text: 'Recent posts pulled from high-follower pages', correct: true },
      { text: 'Recommended content from outside the user’s network', correct: true },
      { text: 'Every post in the database' },
    ],
    explanation: 'Retrieval narrows the universe of posts to a few thousand candidates.',
  },
  {
    prompt: 'Why are large fan-outs placed in a separate bulk lane?',
    options: [
      { text: 'So they do not delay delivery of ordinary posts in the fast lane', correct: true },
      { text: 'Because large audiences never see the post' },
      { text: 'To make them strongly consistent' },
    ],
    explanation: 'Priority lanes isolate heavy work from latency-sensitive work.',
  },
  {
    prompt: 'What does the feature store provide to the ranking service?',
    options: [
      {
        text: 'Low-latency access to batch and real-time features such as affinity and engagement velocity',
        correct: true,
      },
      { text: 'The source of truth for post content' },
      { text: 'Media files for posts' },
    ],
    explanation: 'Ranking quality depends on fresh, quickly accessible features.',
  },
  {
    prompt: 'Why apply diversity rules after model scoring?',
    options: [
      {
        text: 'To prevent the feed from being dominated by one author or content type',
        correct: true,
      },
      { text: 'To reduce the number of candidates retrieved' },
      { text: 'To make the feed chronological' },
    ],
    explanation: 'Rules keep the feed balanced even when scores cluster.',
  },
  {
    prompt: 'How are new ranking models validated before full rollout?',
    options: [
      { text: 'A/B tests comparing engagement and satisfaction metrics', correct: true },
      { text: 'They are deployed to all users immediately' },
      { text: 'By checking that they compile' },
    ],
    explanation: 'Online experiments measure real impact on users.',
  },
])
