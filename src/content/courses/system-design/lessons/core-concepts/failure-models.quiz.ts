import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'How many replicas are typically needed to tolerate 2 crash failures while keeping a majority?',
    options: [{ text: '3' }, { text: '5', correct: true }, { text: '7' }],
    explanation: 'Crash tolerance of f failures typically needs 2f + 1 = 5 replicas.',
  },
  {
    prompt:
      'A leader pauses for 10 seconds during garbage collection, then resumes acting as leader after a new one was elected. What type of failure is this?',
    options: [
      { text: 'Byzantine failure' },
      { text: 'Timing failure', correct: true },
      { text: 'Fail-stop failure' },
    ],
    explanation:
      'The node responded outside the expected time window; leases and fencing tokens mitigate this.',
  },
  {
    prompt: 'Which statements about failure detection are true?',
    options: [
      { text: 'Timeouts alone cannot distinguish a slow node from a dead one', correct: true },
      {
        text: 'Short timeouts detect failures quickly but cause more false positives',
        correct: true,
      },
      { text: 'Byzantine failures are the easiest to tolerate' },
    ],
    explanation:
      'Byzantine failures are the hardest, requiring 3f + 1 nodes and complex protocols.',
  },
])
