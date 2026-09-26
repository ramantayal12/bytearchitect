import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Document "cat": Bob’s delete(0) is applied first. What should Alice’s concurrent insert(3, "s") become?',
    options: [
      { text: 'insert(2, "s")', correct: true },
      { text: 'insert(3, "s")' },
      { text: 'insert(4, "s")' },
    ],
    explanation: 'Deleting a character before position 3 shifts the insertion left by one.',
  },
  {
    prompt: 'What property lets CRDT operations be applied in any order?',
    options: [
      {
        text: 'Operations commute because elements have unique, immutable identifiers',
        correct: true,
      },
      { text: 'A central server transforms every operation' },
      { text: 'Only one user may edit at a time' },
    ],
    explanation: 'Position is expressed relative to stable IDs, not shifting indexes.',
  },
  {
    prompt: 'Which statements about OT and CRDTs are true?',
    multi: true,
    options: [
      { text: 'OT is usually used with a central server that orders operations', correct: true },
      { text: 'CRDTs support offline and peer-to-peer merging naturally', correct: true },
      { text: 'CRDTs carry more metadata, such as tombstones', correct: true },
      { text: 'OT requires no transformation functions' },
    ],
    explanation: 'Transformation functions are the heart of OT.',
  },
])
