import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why do most large search systems prefer document partitioning?',
    options: [
      { text: 'Indexing a document touches one shard, and load balances naturally', correct: true },
      { text: 'Queries touch only one shard' },
      { text: 'It avoids replication' },
    ],
    explanation: 'Its cost is scatter-gather queries, which are manageable.',
  },
  {
    prompt: 'What is a hedged request?',
    options: [
      {
        text: 'Sending a duplicate request to another replica if the first is slow, and using the first response',
        correct: true,
      },
      { text: 'Caching a request for later' },
      { text: 'Splitting a request into smaller pieces' },
    ],
    explanation: 'Hedging trims tail latency at a small extra cost.',
  },
  {
    prompt: 'How do you increase query throughput versus index capacity?',
    options: [
      { text: 'Add replicas for throughput; add shards for data size', correct: true },
      { text: 'Add shards for throughput; add replicas for data size' },
      { text: 'Neither can be scaled' },
    ],
    explanation: 'Replicas share query load; shards split the data.',
  },
])
