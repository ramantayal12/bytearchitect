import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why are query frequencies decayed over time?',
    options: [
      { text: 'So recent popularity outweighs queries that were popular long ago', correct: true },
      { text: 'To make the trie larger' },
      { text: 'Because old queries are illegal' },
    ],
    explanation: 'Decay keeps suggestions current.',
  },
  {
    prompt: 'Why are queries that appear only a handful of times dropped from suggestions?',
    options: [
      { text: 'They add little value and could expose private information', correct: true },
      { text: 'Rare queries cannot be stored in a trie' },
      { text: 'They are always misspelled' },
    ],
    explanation: 'Suggesting rare queries risks leaking personal searches.',
  },
  {
    prompt: 'How can a harmful suggestion be removed before the next trie rebuild?',
    options: [
      {
        text: 'Push a small override list to servers through a fast removal channel',
        correct: true,
      },
      { text: 'Wait until the next daily snapshot' },
      { text: 'Restart every server with an empty trie' },
    ],
    explanation: 'Overrides take effect immediately without rebuilding.',
  },
])
