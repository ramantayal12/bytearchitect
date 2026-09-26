import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is a hedged request?',
    options: [
      {
        text: 'Sending a second request to another replica if the first has not answered within a threshold, using whichever responds first',
        correct: true,
      },
      { text: 'A request that is retried forever' },
      { text: 'A request that bypasses the cache' },
    ],
    explanation: 'Hedging trims tail latency at a small cost in extra load.',
  },
  {
    prompt:
      'Which usually costs more latency: a cross-ocean round trip or reading 1 MB from memory?',
    options: [
      { text: 'A cross-ocean round trip', correct: true },
      { text: 'Reading 1 MB from memory' },
      { text: 'They are about the same' },
    ],
    explanation: 'About 100 to 150 ms versus microseconds.',
  },
  {
    prompt: 'Which techniques improve perceived latency?',
    multi: true,
    options: [
      { text: 'Optimistic UI updates', correct: true },
      { text: 'Streaming responses', correct: true },
      { text: 'Pre-fetching likely next content', correct: true },
      { text: 'Adding more sequential dependent calls' },
    ],
    explanation: 'Sequential dependencies add real latency.',
  },
])
