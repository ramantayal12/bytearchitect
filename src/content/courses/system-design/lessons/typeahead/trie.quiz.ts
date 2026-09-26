import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why store the top k completions at every trie node?',
    options: [
      {
        text: 'Lookups return a stored list instead of searching a potentially huge subtree',
        correct: true,
      },
      { text: 'It reduces the total memory of the trie' },
      { text: 'It removes the need for query frequencies' },
    ],
    explanation: 'Precomputation turns an expensive search into a quick lookup.',
  },
  {
    prompt: 'How are the top-k lists computed during the build?',
    options: [
      {
        text: 'Bottom up: each node merges its children’s lists with its own query and keeps the best k',
        correct: true,
      },
      { text: 'Top down: the root decides the list for every node' },
      { text: 'Randomly, then corrected at request time' },
    ],
    explanation: 'A post-order traversal merges short lists efficiently.',
  },
  {
    prompt: 'What does a radix tree do?',
    options: [
      {
        text: 'Merges chains of single-child nodes into nodes labeled with multi-character strings',
        correct: true,
      },
      { text: 'Sorts queries by length' },
      { text: 'Stores each character in a separate database row' },
    ],
    explanation: 'Path compression reduces node count substantially.',
  },
])
