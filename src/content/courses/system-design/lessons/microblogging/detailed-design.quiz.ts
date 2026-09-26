import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What happens when the follower threshold for pushing is lowered?',
    options: [
      { text: 'Fewer write spikes from fan-out, but more merge work at read time', correct: true },
      { text: 'More fan-out writes and less read-time work' },
      { text: 'Timelines no longer need a cache' },
    ],
    explanation: 'More authors become pulled, shifting work from writes to reads.',
  },
  {
    prompt: 'Why is the social graph stored in both directions?',
    options: [
      {
        text: 'So both "followers of X" and "accounts X follows" are single-shard lookups',
        correct: true,
      },
      { text: 'To double the storage cost for durability' },
      { text: 'Because follows are always mutual' },
    ],
    explanation: 'Fan-out needs followers; rebuilds and celebrity merges need followees.',
  },
  {
    prompt: 'When is a topic considered trending?',
    options: [
      {
        text: 'When its current rate is significantly above its historical baseline',
        correct: true,
      },
      { text: 'Whenever it is the most mentioned topic of all time' },
      { text: 'When a celebrity mentions it once' },
    ],
    explanation: 'Trends capture sudden increases, not constant popularity.',
  },
])
