import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why place a durable buffer between log agents and the index?',
    options: [
      { text: 'To absorb bursts and avoid dropping logs when the index slows down', correct: true },
      { text: 'To make logs searchable faster' },
      { text: 'To encrypt logs' },
    ],
    explanation: 'Incidents cause log spikes exactly when logs matter most.',
  },
  {
    prompt: 'Why are log indexes often organized per day?',
    options: [
      {
        text: 'Queries usually target recent ranges, and expired days can be dropped wholesale',
        correct: true,
      },
      { text: 'Search engines require daily indexes' },
      { text: 'It improves free-text relevance' },
    ],
    explanation: 'Dropping an entire index is far cheaper than deleting individual documents.',
  },
  {
    prompt: 'Which tasks do log processors perform?',
    options: [
      { text: 'Parsing unstructured lines into fields', correct: true },
      { text: 'Redacting sensitive data', correct: true },
      { text: 'Routing logs to different storage tiers', correct: true },
      { text: 'Serving end-user web pages' },
    ],
    explanation: 'Processors transform and route logs.',
  },
])
