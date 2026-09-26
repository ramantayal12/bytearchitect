import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'A design needs a real-time game leaderboard with rank queries. Which option fits best?',
    options: [
      { text: 'Memcached strings' },
      { text: 'Redis sorted sets', correct: true },
      { text: 'A CDN' },
    ],
    explanation: 'Sorted sets provide efficient score updates and rank/range queries.',
  },
  {
    prompt: 'How is data distributed across Memcached servers?',
    options: [
      { text: 'By clients, typically using consistent hashing', correct: true },
      { text: 'By servers gossiping with each other' },
      { text: 'By a central master node' },
    ],
    explanation: 'Memcached servers are independent and unaware of each other.',
  },
  {
    prompt: 'Which features does Redis provide that Memcached does not?',
    options: [
      { text: 'Built-in replication and failover', correct: true },
      { text: 'Optional persistence', correct: true },
      { text: 'Rich data structures', correct: true },
      { text: 'Storing values in memory' },
    ],
    explanation: 'Both store values in memory.',
  },
])
