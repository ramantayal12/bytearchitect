import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'How does a fencing token prevent split ownership of a document?',
    options: [
      {
        text: 'The operation log rejects appends carrying an older ownership token',
        correct: true,
      },
      { text: 'It encrypts every operation' },
      { text: 'It forces all clients offline' },
    ],
    explanation: 'Only the current owner, with the newest token, can write.',
  },
  {
    prompt: 'What helps a single session server cope with hundreds of simultaneous editors?',
    multi: true,
    options: [
      { text: 'Throttling cursor updates', correct: true },
      { text: 'Batching operations', correct: true },
      { text: 'Letting extra participants join as viewers', correct: true },
      { text: 'Broadcasting every mouse movement instantly' },
    ],
    explanation: 'Reducing message volume keeps the owner responsive.',
  },
  {
    prompt:
      'A collaborator on another continent edits a document owned by a server far away. What do they experience?',
    options: [
      { text: 'Their own edits are instant; others’ edits arrive slightly later', correct: true },
      { text: 'Every keystroke is delayed by a round trip' },
      { text: 'They cannot edit at all' },
    ],
    explanation: 'Local application hides latency for one’s own typing.',
  },
])
