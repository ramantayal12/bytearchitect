import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Why should prefix-range partitions be chosen by measured traffic rather than evenly by letter?',
    options: [
      {
        text: 'Some starting letters are far more common, so even alphabet splits create hot partitions',
        correct: true,
      },
      { text: 'Tries cannot store certain letters' },
      { text: 'Alphabetical partitions are illegal' },
    ],
    explanation: 'Balanced partitions reflect real query distribution.',
  },
  {
    prompt: 'How are trending queries surfaced without waiting for the daily rebuild?',
    options: [
      {
        text: 'A small trending trie, updated every few minutes from a stream, is merged at serving time',
        correct: true,
      },
      { text: 'The main trie is rebuilt every second' },
      { text: 'Trending queries are never suggested' },
    ],
    explanation: 'A fast, small structure complements the slow, large one.',
  },
  {
    prompt: 'Why are personalized suggestions merged from a separate source?',
    options: [
      { text: 'It keeps the global suggestion path shared and cacheable', correct: true },
      { text: 'Personal queries are more popular than global ones' },
      { text: 'The main trie cannot store any queries' },
    ],
    explanation: 'Mixing personal data into the global trie would break caching and privacy.',
  },
])
