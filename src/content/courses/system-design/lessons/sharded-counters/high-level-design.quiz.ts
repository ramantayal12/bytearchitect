import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Why do reads use an aggregated, cached total instead of summing shards on every request?',
    options: [
      { text: 'Summing N shards per read would multiply read load', correct: true },
      { text: 'Shards cannot be read individually' },
      { text: 'Cached totals are always exact' },
    ],
    explanation: 'Periodic aggregation keeps reads to a single lookup.',
  },
  {
    prompt: 'Why do counters start with one shard?',
    options: [
      {
        text: 'Most counters are cold, so many shards would waste storage and aggregation work',
        correct: true,
      },
      { text: 'Sharding is impossible for new counters' },
      { text: 'One shard provides the highest throughput' },
    ],
    explanation: 'Shards are added only when a counter becomes hot.',
  },
  {
    prompt: 'What is the trade-off of periodic aggregation?',
    options: [
      { text: 'Displayed counts lag slightly behind actual increments', correct: true },
      { text: 'Increments may be lost' },
      { text: 'Writes become slower' },
    ],
    explanation: 'Freshness is traded for cheap reads.',
  },
])
