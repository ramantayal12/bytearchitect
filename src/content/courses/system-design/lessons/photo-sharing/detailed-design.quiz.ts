import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why move older photo variants to an erasure-coded warm tier?',
    options: [
      {
        text: 'They are read less often, and erasure coding provides durability with lower storage overhead than replication',
        correct: true,
      },
      { text: 'Erasure coding makes reads faster than SSDs' },
      { text: 'Older photos no longer need durability' },
    ],
    explanation: 'About 1.5× overhead instead of 3× saves a lot at petabyte scale.',
  },
  {
    prompt: 'What does a blurred placeholder provide?',
    options: [
      { text: 'A tiny preview displayed instantly while the real image loads', correct: true },
      { text: 'A backup copy of the original' },
      { text: 'Protection against duplicate uploads' },
    ],
    explanation: 'A few dozen bytes can make loading feel much faster.',
  },
  {
    prompt: 'Which practices reduce bandwidth for image delivery?',
    multi: true,
    options: [
      { text: 'Serving WebP or AVIF to clients that support them', correct: true },
      { text: 'Requesting the variant that matches the display size', correct: true },
      { text: 'Long cache lifetimes for immutable image URLs', correct: true },
      { text: 'Always serving the original file' },
    ],
    explanation: 'Originals are large and rarely needed for display.',
  },
])
