import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why do separate indexes on latitude and longitude perform poorly for nearby search?',
    options: [
      {
        text: 'The database can efficiently use only one, so it scans a whole band of the world before filtering',
        correct: true,
      },
      { text: 'Latitude and longitude cannot be indexed' },
      { text: 'Indexes only work on text columns' },
    ],
    explanation: 'One-dimensional indexes do not capture two-dimensional proximity.',
  },
  {
    prompt: 'Which property of business data makes an in-memory spatial index practical?',
    options: [
      {
        text: 'Businesses rarely move, so the index can be built offline and updated slowly',
        correct: true,
      },
      { text: 'Businesses change location every few seconds' },
      { text: 'There are only a few thousand businesses worldwide' },
    ],
    explanation: 'Mostly static data tolerates periodic rebuilds.',
  },
  {
    prompt: 'Why should a spatial index adapt to density?',
    options: [
      {
        text: 'Cities have thousands of businesses per square kilometer while rural areas have almost none',
        correct: true,
      },
      { text: 'All areas have the same number of businesses' },
      { text: 'Density only matters for map tiles' },
    ],
    explanation: 'Fixed-size cells would be overcrowded in cities and empty elsewhere.',
  },
])
