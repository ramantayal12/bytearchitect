import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why are large blobs uploaded in chunks?',
    options: [
      { text: 'Chunks can be uploaded in parallel', correct: true },
      { text: 'Failed chunks can be retried without restarting the whole upload', correct: true },
      { text: 'Chunks let data be spread across many servers', correct: true },
      { text: 'Chunking makes files smaller' },
    ],
    explanation: 'Chunking improves throughput and resilience but does not compress data.',
  },
  {
    prompt: 'What is the difference between durability and availability?',
    options: [
      {
        text: 'Durability means data is not lost; availability means it can be accessed right now',
        correct: true,
      },
      { text: 'They are the same thing' },
      { text: 'Availability means data is never lost' },
    ],
    explanation: 'Data can be safely stored but temporarily unreachable.',
  },
  {
    prompt: 'Which feature supports streaming a video from the middle?',
    options: [
      { text: 'Byte-range reads', correct: true },
      { text: 'Container deletion' },
      { text: 'Prefix listing' },
    ],
    explanation: 'Range reads fetch only the needed portion of a blob.',
  },
])
