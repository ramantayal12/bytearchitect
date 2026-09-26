import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'A counter has 8 shards with values 10, 12, 9, 11, 10, 8, 13, 7. What is its total?',
    options: [{ text: '13' }, { text: '80', correct: true }, { text: '10' }],
    explanation: 'Sum all shards: 80.',
  },
  {
    prompt: 'Which statements about sharded counters are true?',
    options: [
      { text: 'Each increment updates only one shard', correct: true },
      { text: 'Write contention per shard drops as shards are added', correct: true },
      { text: 'Every increment must update all shards' },
    ],
    explanation: 'Only reads involve all shards (via aggregation).',
  },
  {
    prompt: 'Which read-path techniques handle millions of views of a viral post’s like count?',
    options: [
      { text: 'Cached aggregated totals', correct: true },
      { text: 'Local caches in API servers', correct: true },
      { text: 'Summing all shards directly in the database for every view' },
    ],
    explanation: 'Direct summing per view would overwhelm the store.',
  },
  {
    prompt: 'How can counting be made exactly-once when using an event log?',
    options: [
      {
        text: 'Apply deltas idempotently, tagged with log offsets, before committing offsets',
        correct: true,
      },
      { text: 'Never replay the log' },
      { text: 'Use only one consumer and hope it never crashes' },
    ],
    explanation: 'Idempotent application makes replays harmless.',
  },
  {
    prompt: 'When should a counter’s shard count be increased?',
    options: [
      { text: 'When its increment rate becomes high (it gets hot)', correct: true },
      { text: 'Immediately for every new counter' },
      { text: 'Never' },
    ],
    explanation: 'Dynamic scaling saves resources on cold counters.',
  },
  {
    prompt: 'Why is the relationship table (user, post) needed in addition to the counter?',
    options: [
      {
        text: 'To know whether a specific user has liked a post and to prevent double likes',
        correct: true,
      },
      { text: 'Because counters cannot exceed 1,000' },
      { text: 'To store the post’s image' },
    ],
    explanation: 'Counts alone cannot answer per-user questions.',
  },
])
