import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'A host starts returning 503 responses. What should a polite crawler do?',
    options: [
      { text: 'Back off exponentially before contacting it again', correct: true },
      { text: 'Retry immediately with more connections' },
      { text: 'Ignore the responses and continue at the same rate' },
    ],
    explanation: 'Errors and slow responses are signals to reduce load.',
  },
  {
    prompt: 'Which technique detects pages that differ only in ads or timestamps?',
    options: [
      { text: 'Near-duplicate fingerprints such as SimHash', correct: true },
      { text: 'An exact SHA-256 hash of the raw page' },
      { text: 'Sorting URLs alphabetically' },
    ],
    explanation: 'Similar documents get fingerprints within a small Hamming distance.',
  },
  {
    prompt: 'Which defenses help against crawler traps?',
    multi: true,
    options: [
      { text: 'URL length and depth limits', correct: true },
      { text: 'Per-host page budgets', correct: true },
      { text: 'Detecting repeated path patterns', correct: true },
      { text: 'Following every link without limits' },
    ],
    explanation: 'Unbounded crawling is exactly what traps exploit.',
  },
])
