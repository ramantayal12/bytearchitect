import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What does a typeahead lookup cost with precomputed top-k lists in the trie?',
    options: [
      { text: 'Time proportional to the prefix length', correct: true },
      { text: 'Time proportional to the number of queries in the subtree' },
      { text: 'Time proportional to the total number of queries' },
    ],
    explanation: 'Walk to the prefix node and return its stored list.',
  },
  {
    prompt: 'Which client-side techniques reduce load on the suggestion service?',
    multi: true,
    options: [
      { text: 'Debouncing keystrokes', correct: true },
      { text: 'Caching responses for the session', correct: true },
      { text: 'Serving short prefixes from a static, CDN-cached file', correct: true },
      { text: 'Sending a request for every keystroke twice' },
    ],
    explanation: 'Many requests never need to reach the servers.',
  },
  {
    prompt: 'Where does most of the typeahead latency budget go?',
    options: [
      { text: 'Network round trips and client debounce', correct: true },
      { text: 'The trie lookup' },
      { text: 'Database queries' },
    ],
    explanation: 'Server work is sub-millisecond; network dominates.',
  },
  {
    prompt: 'How are new trie snapshots deployed safely?',
    options: [
      {
        text: 'Validated, versioned, rolled out to canary servers first and rolled back instantly if needed',
        correct: true,
      },
      { text: 'Loaded on all servers at once without checks' },
      { text: 'Edited in place on each server' },
    ],
    explanation: 'Immutable versions make rollouts and rollbacks safe.',
  },
  {
    prompt: 'Which data sources feed suggestions?',
    options: [
      { text: 'Aggregated logs of queries users actually submitted', correct: true },
      { text: 'The titles of every web page' },
      { text: 'Random dictionary words' },
    ],
    explanation: 'Suggestions reflect real, popular searches.',
  },
  {
    prompt: 'When is partitioning the trie by prefix range needed?',
    options: [
      { text: 'When the data no longer fits in the memory of one server', correct: true },
      { text: 'Always, even for small datasets' },
      { text: 'Only when there are fewer than 1,000 queries' },
    ],
    explanation: 'Full replication is simpler while the data fits.',
  },
])
