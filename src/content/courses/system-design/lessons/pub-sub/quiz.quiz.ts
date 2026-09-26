import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Five different services subscribe to the same topic. How many times is each message stored in a log-based system?',
    options: [
      { text: 'Once per subscriber (five times)' },
      { text: 'Once, with replicas for durability', correct: true },
      { text: 'Not at all' },
    ],
    explanation: 'Subscribers read the same log using their own offsets.',
  },
  {
    prompt:
      'How does a log-based system let a new analytics service process all events from last week?',
    options: [
      {
        text: 'The service starts reading from an older offset within the retention period',
        correct: true,
      },
      { text: 'Publishers must resend all events' },
      { text: 'It is impossible' },
    ],
    explanation: 'Replay is a key benefit of retaining logs.',
  },
  {
    prompt: 'Which statements about partitions are true?',
    options: [
      { text: 'Messages with the same key go to the same partition', correct: true },
      { text: 'Order is guaranteed within a partition', correct: true },
      { text: 'Order is guaranteed across all partitions of a topic' },
    ],
    explanation: 'Only per-partition ordering is guaranteed.',
  },
  {
    prompt: 'What happens during a consumer group rebalance?',
    options: [
      { text: 'Partitions are reassigned among the group’s members', correct: true },
      { text: 'All messages are deleted' },
      { text: 'Publishers are paused permanently' },
    ],
    explanation: 'Rebalancing occurs when members join or leave.',
  },
  {
    prompt: 'Which techniques make log-based brokers fast?',
    options: [
      { text: 'Sequential disk I/O', correct: true },
      { text: 'Batching and compression', correct: true },
      { text: 'Zero-copy transfer', correct: true },
      { text: 'Random writes to many small files per message' },
    ],
    explanation: 'Random small writes would be slow.',
  },
  {
    prompt: 'Why is pub-sub well suited to event-driven microservices?',
    options: [
      { text: 'Publishers emit facts without knowing which services will react', correct: true },
      { text: 'It requires every service to call every other service' },
      { text: 'It guarantees synchronous responses' },
    ],
    explanation: 'Loose coupling allows services to evolve independently.',
  },
])
