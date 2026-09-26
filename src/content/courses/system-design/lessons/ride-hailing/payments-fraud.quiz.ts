import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'A capture request times out, but the processor actually succeeded. What prevents a double charge on retry?',
    options: [
      {
        text: 'An idempotency key that makes the processor return the original result',
        correct: true,
      },
      { text: 'Waiting ten seconds before retrying' },
      { text: 'Retrying with a new random request ID' },
    ],
    explanation: 'The same key identifies the same operation, so duplicates are harmless.',
  },
  {
    prompt: 'Why is the ledger append-only with balanced debits and credits?',
    options: [
      { text: 'History is never edited, and imbalances reveal errors', correct: true },
      { text: 'It makes the ledger smaller' },
      { text: 'Append-only tables cannot be read' },
    ],
    explanation: 'Corrections are new entries, preserving an auditable trail.',
  },
  {
    prompt: 'Which signals help detect GPS spoofing or fake trips?',
    multi: true,
    options: [
      { text: 'Impossible speeds between consecutive location pings', correct: true },
      { text: 'Many accounts sharing one device or payment method', correct: true },
      { text: 'The rider’s choice of app theme' },
    ],
    explanation: 'Physical impossibilities and shared identifiers reveal abuse.',
  },
])
