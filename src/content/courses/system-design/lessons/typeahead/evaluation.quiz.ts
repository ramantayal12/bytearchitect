import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'The nightly trie build job fails. What do users experience?',
    options: [
      {
        text: 'Suggestions continue from the previous snapshot, just slightly stale',
        correct: true,
      },
      { text: 'Suggestions disappear entirely' },
      { text: 'Search stops working' },
    ],
    explanation: 'The serving path depends only on the snapshot already loaded.',
  },
  {
    prompt: 'What feedback loop can pure popularity ranking create?',
    options: [
      {
        text: 'Suggested queries get searched more, which makes them more popular and more suggested',
        correct: true,
      },
      { text: 'Popular queries become less popular over time' },
      { text: 'The trie grows without bound' },
    ],
    explanation: 'Damping selections from suggestions and quality signals reduce the loop.',
  },
  {
    prompt: 'Which metrics indicate that typeahead is helping users?',
    multi: true,
    options: [
      { text: 'Keystrokes saved per search', correct: true },
      { text: 'Suggestion acceptance rate', correct: true },
      { text: 'Success of searches started from suggestions', correct: true },
      { text: 'Number of servers deployed' },
    ],
    explanation: 'User-facing outcomes measure value; server count does not.',
  },
])
