import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'How should a learner’s progress for a course be stored for efficient reads?',
    options: [
      {
        text: 'As one document per learner and course in a store partitioned by learner',
        correct: true,
      },
      { text: 'As one global row updated by every learner' },
      { text: 'In the CDN' },
    ],
    explanation: 'Most reads fetch one learner’s progress for one course.',
  },
  {
    prompt: 'Which building blocks are involved in publishing an instructor’s uploaded video?',
    options: [
      { text: 'Blob store', correct: true },
      { text: 'Messaging queue for transcoding jobs', correct: true },
      { text: 'CDN for delivery', correct: true },
      { text: 'Sharded counters' },
    ],
    explanation: 'Counters are unrelated to the video publishing pipeline.',
  },
  {
    prompt: 'What triggers certificate generation in the design?',
    options: [
      { text: 'A course-completed event published to pub-sub', correct: true },
      { text: 'A nightly scan of all learners by the CDN' },
      { text: 'The learner emailing support' },
    ],
    explanation: 'Event-driven design decouples progress tracking from certificate generation.',
  },
])
