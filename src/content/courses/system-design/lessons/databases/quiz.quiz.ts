import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which technique increases write capacity beyond a single machine?',
    options: [
      { text: 'Adding read replicas' },
      { text: 'Partitioning (sharding)', correct: true },
      { text: 'Adding indexes' },
    ],
    explanation: 'Replicas scale reads; sharding splits write load across machines.',
  },
  {
    prompt:
      'A user updates their profile and immediately reloads, but sees old data read from a lagging follower. Which fix provides read-your-writes?',
    options: [
      {
        text: 'Serve that user’s reads from the leader for a short period after they write',
        correct: true,
      },
      { text: 'Add more followers' },
      { text: 'Switch to range partitioning' },
    ],
    explanation:
      'Reading recent writes from the leader, or tracking replication position, avoids the anomaly.',
  },
  {
    prompt:
      'Which database type is best suited to relationship-heavy queries such as “friends of friends who like X”?',
    options: [
      { text: 'Key-value store' },
      { text: 'Graph database', correct: true },
      { text: 'Blob store' },
    ],
    explanation: 'Graph databases are optimized for traversing relationships.',
  },
  {
    prompt: 'Which statements about consistent hashing are true?',
    options: [
      { text: 'Adding a node moves only a fraction of keys', correct: true },
      { text: 'It helps distribute keys across a changing set of nodes', correct: true },
      { text: 'It guarantees perfectly even load without virtual nodes' },
    ],
    explanation: 'Virtual nodes are typically needed to smooth out uneven distribution.',
  },
  {
    prompt: 'What is a downside of denormalization?',
    options: [
      { text: 'Updates must modify every duplicated copy of the data', correct: true },
      { text: 'Reads require more joins' },
      { text: 'It prevents horizontal scaling' },
    ],
    explanation: 'Duplicated data speeds reads but complicates and slows updates.',
  },
  {
    prompt: 'Which replication scheme is most likely to require conflict resolution?',
    options: [
      { text: 'Single-leader' },
      { text: 'Multi-leader', correct: true },
      { text: 'Synchronous single-leader' },
    ],
    explanation: 'Multiple leaders can accept concurrent conflicting writes.',
  },
  {
    prompt: 'What makes a partition key a poor choice?',
    options: [
      { text: 'A few keys receive most of the traffic', correct: true },
      { text: 'Common queries need data from every shard', correct: true },
      { text: 'It has very high cardinality' },
    ],
    explanation: 'High cardinality is desirable; hotspots and scatter-gather queries are not.',
  },
  {
    prompt:
      'Which of the following is a strong justification for a database choice in an interview?',
    options: [
      { text: '“It is the most popular database.”' },
      {
        text: '“Our access pattern is key lookups at high write volume with eventual consistency acceptable, so a key-value store fits.”',
        correct: true,
      },
      { text: '“I used it at my last job.”' },
    ],
    explanation: 'Tie the choice to access patterns and requirements.',
  },
])
