import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is hinted handoff?',
    options: [
      {
        text: 'A healthy node temporarily stores writes for a down replica and hands them back when it recovers',
        correct: true,
      },
      { text: 'A client hints which node should be the leader' },
      { text: 'Deleting data from failed nodes' },
    ],
    explanation: 'It keeps writes available during temporary failures.',
  },
  {
    prompt: 'Why use Merkle trees for anti-entropy?',
    options: [
      {
        text: 'They let replicas locate differing key ranges while exchanging very little data',
        correct: true,
      },
      { text: 'They encrypt data between replicas' },
      { text: 'They elect a leader' },
    ],
    explanation: 'Matching subtree hashes can be skipped entirely.',
  },
  {
    prompt: 'Which statements about gossip-based failure detection are true?',
    options: [
      { text: 'Nodes exchange membership lists with random peers periodically', correct: true },
      { text: 'Information spreads through the cluster within a few rounds', correct: true },
      { text: 'It requires a central coordinator' },
    ],
    explanation: 'Gossip is fully decentralized.',
  },
])
