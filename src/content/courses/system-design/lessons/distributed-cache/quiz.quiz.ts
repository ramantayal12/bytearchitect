import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'In the cache-aside pattern, who loads data into the cache on a miss?',
    options: [
      { text: 'The application', correct: true },
      { text: 'The database' },
      { text: 'The cache automatically' },
    ],
    explanation: 'In read-through, the cache loads it; in cache-aside, the application does.',
  },
  {
    prompt:
      'Which eviction policy removes the entry that has not been accessed for the longest time?',
    options: [{ text: 'LFU' }, { text: 'LRU', correct: true }, { text: 'FIFO' }],
    explanation: 'Least recently used tracks recency of access.',
  },
  {
    prompt: 'What mitigates a cache stampede on a popular key?',
    options: [
      { text: 'Request coalescing so only one request reloads the key', correct: true },
      { text: 'Refreshing the key shortly before it expires', correct: true },
      { text: 'Setting all TTLs to exactly the same value' },
    ],
    explanation: 'Synchronized expiry makes stampedes worse; jittered TTLs help.',
  },
  {
    prompt: 'Why does slab allocation help caches?',
    options: [
      { text: 'It reduces memory fragmentation for many small objects', correct: true },
      { text: 'It encrypts values' },
      { text: 'It persists data to disk' },
    ],
    explanation: 'Fixed-size chunks avoid fragmentation from frequent allocation and freeing.',
  },
  {
    prompt: 'A celebrity’s profile key overloads one cache node. Which is the most direct fix?',
    options: [
      { text: 'Add a short-lived local near-cache on app servers for hot keys', correct: true },
      { text: 'Double the database size' },
      { text: 'Remove the TTL' },
    ],
    explanation: 'Near-caches absorb hot-key reads before they reach the network.',
  },
  {
    prompt: 'Which statements about write-through caching are true?',
    options: [
      { text: 'The cache stays fresh after writes', correct: true },
      {
        text: 'Write latency increases because both cache and database are updated',
        correct: true,
      },
      { text: 'Writes may be lost if the cache fails before flushing' },
    ],
    explanation: 'That risk applies to write-back, not write-through.',
  },
  {
    prompt: 'What should you consider when the cache might be completely empty?',
    options: [
      {
        text: 'Whether the database can survive the resulting load, and how to protect it',
        correct: true,
      },
      { text: 'Nothing; caches never empty' },
      { text: 'Only increasing the TTL' },
    ],
    explanation: 'Cold caches can overload the backend without protection.',
  },
])
