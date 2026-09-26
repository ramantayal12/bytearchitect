import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'With erasure coding k = 6, m = 3, how many fragments can be lost without losing data?',
    options: [{ text: '1' }, { text: '3', correct: true }, { text: '6' }],
    explanation: 'Any 6 of the 9 fragments can reconstruct the chunk.',
  },
  {
    prompt: 'What is the storage overhead of 3-way replication compared with 6+3 erasure coding?',
    options: [
      { text: '200% versus 50%', correct: true },
      { text: '50% versus 200%' },
      { text: 'They are the same' },
    ],
    explanation: 'Replication stores 3 copies; 6+3 stores 9 fragments for 6 fragments of data.',
  },
  {
    prompt: 'Why is range partitioning useful for blob metadata?',
    options: [
      {
        text: 'It keeps names with a common prefix together, making listing efficient',
        correct: true,
      },
      { text: 'It eliminates all hotspots' },
      { text: 'It requires no partition splitting' },
    ],
    explanation: 'Sequential names can still create hotspots, handled by splitting.',
  },
])
