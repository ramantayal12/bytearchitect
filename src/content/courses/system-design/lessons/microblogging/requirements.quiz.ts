import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why do cached timelines store only post IDs rather than full posts?',
    options: [
      {
        text: 'Post content is stored once and hydrated at read time, keeping fan-out cheap and timelines small',
        correct: true,
      },
      { text: 'Post content cannot be cached' },
      { text: 'IDs are required by the search service' },
    ],
    explanation: 'An 8-byte ID per follower is far cheaper than copying the full post.',
  },
  {
    prompt:
      '500 million posts per day are pushed to an average of 200 followers. About how many timeline inserts per day is that?',
    options: [
      { text: '100 million' },
      { text: '100 billion', correct: true },
      { text: '1 trillion' },
    ],
    explanation: '5 × 10⁸ × 200 = 10¹¹ inserts per day.',
  },
  {
    prompt: 'Which requirement explains why a follower may see a new post a few seconds late?',
    options: [
      { text: 'The service favors availability and accepts eventual consistency', correct: true },
      { text: 'Posts must be approved manually' },
      { text: 'Timelines are rebuilt once a day' },
    ],
    explanation: 'Asynchronous fan-out introduces small delays that users accept.',
  },
])
