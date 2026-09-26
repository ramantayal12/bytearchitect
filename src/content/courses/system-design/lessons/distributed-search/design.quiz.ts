import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'In a scatter-gather query over a document-partitioned index, what determines overall latency?',
    options: [
      { text: 'The slowest shard', correct: true },
      { text: 'The fastest shard' },
      { text: 'The average shard' },
    ],
    explanation: 'The coordinator must wait for all shards (or time out on stragglers).',
  },
  {
    prompt: 'Why use two-phase ranking?',
    options: [
      {
        text: 'Expensive models can only be applied to a small set of candidates within the latency budget',
        correct: true,
      },
      { text: 'To avoid using an inverted index' },
      { text: 'To make indexing faster' },
    ],
    explanation: 'Cheap retrieval narrows candidates for expensive re-ranking.',
  },
  {
    prompt: 'Why feed the indexing pipeline from a durable change stream?',
    options: [
      { text: 'Indexers can fall behind or crash without losing updates', correct: true },
      { text: 'The index can be rebuilt by replaying events', correct: true },
      { text: 'It guarantees zero indexing latency' },
    ],
    explanation: 'Streams decouple and buffer; they do not eliminate latency.',
  },
])
