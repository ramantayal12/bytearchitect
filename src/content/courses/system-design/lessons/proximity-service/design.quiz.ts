import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why does the location-based service need no locking on its index?',
    options: [
      {
        text: 'The index is read-only between refreshes and new snapshots are swapped in atomically',
        correct: true,
      },
      { text: 'It stores the index in a relational database with transactions' },
      { text: 'Only one request is served at a time' },
    ],
    explanation: 'Immutable snapshots make concurrent reads trivial.',
  },
  {
    prompt:
      'After looking up candidate IDs from overlapping cells, what must the service still do?',
    options: [
      {
        text: 'Compute exact distances, drop those outside the radius, filter and rank',
        correct: true,
      },
      { text: 'Return all candidates unsorted' },
      { text: 'Rebuild the spatial index' },
    ],
    explanation: 'Cells overlap the circle only approximately, so an exact filter is required.',
  },
  {
    prompt: 'How do business updates reach search results?',
    options: [
      {
        text: 'Change events feed an index builder that produces periodic snapshots',
        correct: true,
      },
      { text: 'Every update synchronously rewrites the index on every server' },
      { text: 'Updates never reach search results' },
    ],
    explanation: 'Batched snapshots provide eventual consistency without slowing searches.',
  },
])
