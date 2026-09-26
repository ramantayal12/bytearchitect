import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the main risk of asynchronous replication if the leader crashes?',
    options: [
      {
        text: 'Recently acknowledged writes that were not yet replicated may be lost',
        correct: true,
      },
      { text: 'Reads become impossible forever' },
      { text: 'Followers automatically merge conflicting data' },
    ],
    explanation: 'The leader acknowledged writes before followers received them.',
  },
  {
    prompt:
      'With n = 3 replicas, which quorum settings guarantee that reads overlap the latest write?',
    options: [
      { text: 'w = 2, r = 2', correct: true },
      { text: 'w = 1, r = 1' },
      { text: 'w = 3, r = 1', correct: true },
      { text: 'w = 1, r = 2' },
    ],
    explanation: 'Overlap requires w + r > n, that is, w + r > 3.',
  },
  {
    prompt: 'Which replication approach must handle write conflicts between data centers?',
    options: [
      { text: 'Single-leader' },
      { text: 'Multi-leader', correct: true },
      { text: 'No replication' },
    ],
    explanation: 'Multiple leaders can accept concurrent writes to the same data.',
  },
])
