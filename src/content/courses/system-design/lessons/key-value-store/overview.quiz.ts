import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why can key-value stores scale so well?',
    options: [
      {
        text: 'They support only simple operations on opaque values, making partitioning and replication straightforward',
        correct: true,
      },
      { text: 'They store all data in a single node' },
      { text: 'They support complex joins' },
    ],
    explanation: 'Simple access patterns make it easy to spread keys across machines.',
  },
  {
    prompt: 'What does “always writable” imply for the design?',
    options: [
      {
        text: 'Replicas may temporarily diverge, so conflicts must be detected and resolved',
        correct: true,
      },
      { text: 'Writes are rejected during failures' },
      { text: 'Only one replica ever accepts writes' },
    ],
    explanation: 'Prioritizing availability accepts divergence and requires reconciliation.',
  },
  {
    prompt:
      'Roughly how many 4 TB nodes are needed for 100 TB of data with 3 replicas, before headroom?',
    options: [{ text: 'About 25' }, { text: 'About 75', correct: true }, { text: 'About 300' }],
    explanation: '300 TB / 4 TB ≈ 75 nodes.',
  },
])
