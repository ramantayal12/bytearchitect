import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'On average, what fraction of keys moves when a node is added to a consistent-hashing ring of N nodes?',
    options: [{ text: 'About 1/N', correct: true }, { text: 'About half' }, { text: 'Nearly all' }],
    explanation: 'Only the keys in the new node’s arc move.',
  },
  {
    prompt: 'What do virtual nodes provide?',
    options: [
      { text: 'More even distribution of keys', correct: true },
      { text: 'Spreading a failed node’s load across many nodes', correct: true },
      { text: 'Support for machines with different capacities', correct: true },
      { text: 'Strong consistency' },
    ],
    explanation: 'Vnodes are about balance and flexibility, not consistency.',
  },
  {
    prompt:
      'Why must replicas be placed on distinct physical nodes, skipping vnodes of the same machine?',
    options: [
      { text: 'Otherwise one machine failure could destroy multiple replicas', correct: true },
      { text: 'Vnodes cannot store data' },
      { text: 'It reduces network traffic' },
    ],
    explanation: 'Replicas on the same machine share its failure fate.',
  },
])
