import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which of these is a well-specified non-functional requirement?',
    options: [
      { text: 'The system should be fast' },
      { text: 'p99 latency for timeline reads is under 200 ms', correct: true },
      { text: 'Users can post comments' },
    ],
    explanation: 'Specific, measurable targets give you something concrete to design against.',
  },
  {
    prompt: 'Which technique primarily addresses a low-latency requirement for read-heavy data?',
    options: [
      { text: 'Caching and precomputation', correct: true },
      { text: 'Synchronous cross-region replication' },
      { text: 'Daily backups' },
    ],
    explanation: 'Caches and precomputed results reduce work on the read path.',
  },
  {
    prompt: 'How should you handle conflicting NFRs such as strong consistency and low latency?',
    options: [
      { text: 'Pick one for the whole system' },
      {
        text: 'Prioritize explicitly, often choosing differently per component or data type',
        correct: true,
      },
      { text: 'Ignore the conflict' },
    ],
    explanation: 'For example, strong consistency for payments but eventual consistency for feeds.',
  },
])
