import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which problem does range partitioning on a timestamp key typically cause?',
    options: [
      { text: 'A write hotspot on the shard holding the newest time range', correct: true },
      { text: 'Range queries become impossible' },
      { text: 'Data cannot be replicated' },
    ],
    explanation: 'All current writes have similar timestamps and land on the same shard.',
  },
  {
    prompt: 'Why is shard = hash(key) mod N problematic when N changes?',
    options: [
      {
        text: 'Almost every key maps to a different shard, forcing massive data movement',
        correct: true,
      },
      { text: 'Hash functions cannot handle large N' },
      { text: 'It creates range-query hotspots' },
    ],
    explanation: 'Consistent hashing moves only about 1/N of keys when a shard is added.',
  },
  {
    prompt: 'Which are properties of a good partition key?',
    options: [
      { text: 'High cardinality with evenly distributed load', correct: true },
      { text: 'Keeps the most common queries within one shard', correct: true },
      { text: 'Maps most traffic to a small number of keys' },
    ],
    explanation: 'Concentrating traffic on a few keys creates hotspots.',
  },
])
