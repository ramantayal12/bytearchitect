import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What can a Bloom filter tell you with certainty?',
    options: [
      { text: 'That an item is definitely not in the set', correct: true },
      { text: 'That an item is definitely in the set' },
      { text: 'How many times an item was inserted' },
    ],
    explanation: 'False positives are possible; false negatives are not.',
  },
  {
    prompt: 'How does a majority quorum prevent split-brain?',
    options: [
      {
        text: 'Only the side of a partition with a majority of nodes can elect a leader',
        correct: true,
      },
      { text: 'It lets both sides accept writes and merges them later' },
      { text: 'It disables heartbeats' },
    ],
    explanation: 'At most one side can have a majority.',
  },
  {
    prompt: 'What does the outbox pattern guarantee?',
    options: [
      { text: 'Events are published if and only if the business change commits', correct: true },
      { text: 'Messages are delivered in under one millisecond' },
      { text: 'Databases never need backups' },
    ],
    explanation: 'Writing the event in the same transaction avoids lost or phantom events.',
  },
])
