import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Why is a plain shortest-path search over the whole road graph a problem for interactive routing?',
    options: [
      {
        text: 'The graph has hundreds of millions of edges, so the search is too slow',
        correct: true,
      },
      { text: 'Shortest-path algorithms cannot handle road networks' },
      { text: 'Road graphs have no edge weights' },
    ],
    explanation: 'Continent-scale graphs need partitioning and precomputation for fast queries.',
  },
  {
    prompt: 'What feeds live traffic estimates?',
    options: [
      { text: 'Anonymous location pings from navigating devices', correct: true },
      { text: 'Map tiles cached at the CDN' },
      { text: 'Place search queries' },
    ],
    explanation: 'Device speeds on road segments reveal current traffic conditions.',
  },
  {
    prompt: 'Which parts of a maps service are well suited to CDN delivery?',
    options: [
      { text: 'Map tiles', correct: true },
      { text: 'Personalized routes with live traffic' },
      { text: 'Location ping ingestion' },
    ],
    explanation: 'Tiles change slowly and are shared by all users; routes are per request.',
  },
])
