import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why can a newsfeed not be served by caching each user’s rendered feed page at a CDN?',
    options: [
      {
        text: 'Every user’s feed is different and changes often, so a page cache would rarely hit',
        correct: true,
      },
      { text: 'CDNs cannot cache HTML' },
      { text: 'Feeds contain images, which CDNs do not support' },
    ],
    explanation:
      'Personalization defeats page caching; the design caches shared ingredients such as posts and features instead.',
  },
  {
    prompt: 'Which statements describe how a ranked feed differs from a chronological one?',
    options: [
      { text: 'Items are ordered by predicted value to the user', correct: true },
      { text: 'Serving it costs more per request because of model inference', correct: true },
      { text: 'It can be paginated with “posts older than this timestamp”' },
      { text: 'It never shows content from accounts the user does not follow' },
    ],
    explanation:
      'Ranking reorders items and adds inference cost; pagination uses a session ranking, and recommendations may be mixed in.',
  },
  {
    prompt: 'Which rule must still hold even when the feed is degraded?',
    options: [
      { text: 'Deleted posts and audience restrictions are always enforced', correct: true },
      { text: 'Every item must be ranked by the heaviest model' },
      { text: 'Recommendations must always be included' },
    ],
    explanation: 'Integrity is non-negotiable; ranking quality and recommendations can degrade.',
  },
])
