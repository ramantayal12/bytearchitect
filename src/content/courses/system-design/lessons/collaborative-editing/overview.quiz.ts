import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Why do collaborative editors apply a user’s edits locally before the server confirms them?',
    options: [
      {
        text: 'Waiting for a round trip on every keystroke would make typing feel laggy',
        correct: true,
      },
      { text: 'The server cannot store edits' },
      { text: 'Local edits are never sent to others' },
    ],
    explanation: 'Local-first editing keeps typing instant.',
  },
  {
    prompt: 'What does convergence mean for a collaborative editor?',
    options: [
      {
        text: 'After all edits are received, every copy of the document is identical',
        correct: true,
      },
      { text: 'Only one user can edit at a time' },
      { text: 'The document is saved every minute' },
    ],
    explanation: 'All replicas must end in the same state.',
  },
  {
    prompt: 'Which approaches solve concurrent editing of shared text?',
    multi: true,
    options: [
      { text: 'Operational transformation', correct: true },
      { text: 'Conflict-free replicated data types', correct: true },
      { text: 'Last write wins for the whole document' },
    ],
    explanation: 'Last write wins would discard other users’ keystrokes.',
  },
])
