import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'A user updates their display name but, on refresh, still sees the old one. Which guarantee is missing?',
    options: [
      { text: 'Read-your-writes', correct: true },
      { text: 'Monotonic writes' },
      { text: 'Eventual consistency' },
    ],
    explanation: 'Read-your-writes ensures a client always sees its own completed updates.',
  },
  {
    prompt: 'Which data most clearly requires linearizability?',
    options: [
      { text: 'The number of views on a video' },
      { text: 'Whether a username is already taken during sign-up', correct: true },
      { text: 'A list of recommended articles' },
    ],
    explanation:
      'Uniqueness checks need all clients to agree on the latest state; stale reads would allow duplicates.',
  },
  {
    prompt: 'What does causal consistency guarantee?',
    options: [
      { text: 'All operations appear in real-time order to everyone' },
      {
        text: 'Operations that depend on each other are seen in the same order by everyone',
        correct: true,
      },
      { text: 'Replicas never disagree' },
    ],
    explanation:
      'Causally related operations are ordered; unrelated ones may be observed in different orders.',
  },
  {
    prompt: 'What is the main cost of stronger consistency models?',
    options: [
      { text: 'Higher latency and reduced availability during partitions', correct: true },
      { text: 'More storage per record' },
      { text: 'They cannot be used with replication' },
    ],
    explanation:
      'Strong models require coordination between replicas, which adds latency and can block during partitions.',
  },
])
