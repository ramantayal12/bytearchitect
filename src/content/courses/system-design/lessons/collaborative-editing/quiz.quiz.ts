import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Why is locking a paragraph while someone edits it a poor fit for real-time collaboration?',
    options: [
      {
        text: 'It blocks others and adds latency, whereas users expect to type freely at the same time',
        correct: true,
      },
      { text: 'Locks cannot be implemented in databases' },
      { text: 'Locking guarantees divergence' },
    ],
    explanation: 'Collaboration requires concurrent editing with automatic merging.',
  },
  {
    prompt: 'What does the session server do with each incoming operation?',
    multi: true,
    options: [
      { text: 'Transforms it against operations the client had not yet seen', correct: true },
      { text: 'Assigns it the next version number', correct: true },
      { text: 'Appends it to the durable log before acknowledging', correct: true },
      { text: 'Waits for every client to approve it' },
    ],
    explanation: 'The server orders, persists and broadcasts; clients do not vote.',
  },
  {
    prompt: 'How do comments stay attached to the right words as the text changes?',
    options: [
      { text: 'Their anchors are transformed like any other position', correct: true },
      { text: 'Comments are deleted whenever text changes' },
      { text: 'Comments store the absolute character index forever' },
    ],
    explanation: 'Anchors move with inserts and deletes.',
  },
  {
    prompt: 'Why are cursor positions not persisted?',
    options: [
      {
        text: 'They are ephemeral presence data that changes constantly and has no long-term value',
        correct: true,
      },
      { text: 'Cursors cannot be serialized' },
      { text: 'Persistence would break convergence' },
    ],
    explanation: 'Presence is broadcast and throttled but not stored.',
  },
  {
    prompt: 'Which approach suits an offline-first editor without a central server?',
    options: [
      { text: 'CRDTs', correct: true },
      { text: 'Server-ordered OT' },
      { text: 'Last write wins on the whole document' },
    ],
    explanation: 'CRDT operations commute, so peers merge without a central order.',
  },
  {
    prompt: 'Opening a document with a long history should be fast. How?',
    options: [
      { text: 'Load the latest snapshot and replay only operations after it', correct: true },
      { text: 'Replay every operation since the document was created' },
      { text: 'Send each operation as a separate HTTP request' },
    ],
    explanation: 'Periodic snapshots bound the replay work.',
  },
])
