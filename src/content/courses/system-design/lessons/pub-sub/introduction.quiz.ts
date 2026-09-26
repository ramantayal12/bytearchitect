import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'In a log-based pub-sub system, how does a subscriber track its progress?',
    options: [
      { text: 'By remembering the offset it has read up to', correct: true },
      { text: 'By deleting messages it has read' },
      { text: 'By receiving each message exactly once from the broker, which tracks nothing' },
    ],
    explanation: 'Offsets let each subscriber consume independently.',
  },
  {
    prompt:
      'A consumer group reads a topic with 8 partitions. What is the maximum useful number of consumer instances?',
    options: [{ text: '4' }, { text: '8', correct: true }, { text: 'Unlimited' }],
    explanation: 'Each partition is read by one consumer in the group; extra instances sit idle.',
  },
  {
    prompt: 'Which benefits does storing topics as logs provide?',
    options: [
      { text: 'Replay of past messages', correct: true },
      { text: 'Storing each message once regardless of subscriber count', correct: true },
      { text: 'Guaranteed global ordering across all partitions' },
    ],
    explanation: 'Ordering is guaranteed only within a partition.',
  },
])
