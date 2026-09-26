import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why do independent per-shard auto-increment counters fail as global IDs?',
    options: [
      { text: 'Different shards generate the same values, causing collisions', correct: true },
      { text: 'Auto-increment is too slow' },
      { text: 'They cannot be stored in 64 bits' },
    ],
    explanation: 'Each shard starts from the same sequence unless coordinated.',
  },
  {
    prompt: 'Why are roughly time-ordered IDs valuable?',
    options: [
      { text: 'They allow sorting and pagination by ID', correct: true },
      { text: 'They improve B-tree index write locality', correct: true },
      { text: 'They guarantee strict global ordering across all machines' },
    ],
    explanation: 'Rough ordering is useful, but strict global order requires coordination.',
  },
  {
    prompt: 'Why is a 64-bit numeric ID preferred over a long string?',
    options: [
      { text: 'It is compact and indexes efficiently', correct: true },
      { text: 'It is human-readable' },
      { text: 'It is always random' },
    ],
    explanation: 'Compact integers reduce storage and speed up index operations.',
  },
])
