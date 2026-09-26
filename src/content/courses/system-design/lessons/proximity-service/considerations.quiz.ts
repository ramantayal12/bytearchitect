import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why must a geohash search include the eight neighboring cells?',
    options: [
      {
        text: 'Nearby points just across a cell boundary can have completely different geohashes',
        correct: true,
      },
      { text: 'Geohash cells overlap each other' },
      { text: 'Neighboring cells always contain the most popular businesses' },
    ],
    explanation: 'Searching neighbors avoids missing results near boundaries.',
  },
  {
    prompt: 'What is the main advantage of a quadtree over fixed-precision geohashes?',
    options: [
      { text: 'It subdivides dense areas more finely, adapting to density', correct: true },
      { text: 'It can be stored as a string column in any database' },
      { text: 'It never needs to be rebuilt' },
    ],
    explanation: 'Leaves hold a bounded number of businesses regardless of area.',
  },
  {
    prompt: 'Which statements about geohashes are true?',
    multi: true,
    options: [
      { text: 'Each extra character makes the cell about 32 times smaller', correct: true },
      { text: 'A longer shared prefix usually means points are closer', correct: true },
      { text: 'They can be queried with a prefix match on an indexed column', correct: true },
      { text: 'Two points with different geohashes are always far apart' },
    ],
    explanation: 'Points near a boundary can be close yet have different hashes.',
  },
])
