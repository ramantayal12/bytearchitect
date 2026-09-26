import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'A user follows 300 ordinary accounts and 3 celebrities. How is their home timeline assembled?',
    options: [
      {
        text: 'Read the cached timeline of pushed post IDs and merge recent posts from the 3 celebrities',
        correct: true,
      },
      { text: 'Pull posts from all 303 accounts on every request' },
      { text: 'Read only the celebrities’ posts' },
    ],
    explanation: 'The hybrid approach pushes ordinary posts and pulls celebrity posts.',
  },
  {
    prompt: 'Which statements about the home timeline cache are true?',
    multi: true,
    options: [
      { text: 'It stores bounded lists of post IDs per user', correct: true },
      { text: 'It can be rebuilt from the social graph and user timelines', correct: true },
      { text: 'It is the only copy of each post' },
    ],
    explanation: 'The cache is derived data, not the source of truth.',
  },
  {
    prompt: 'How does the design absorb a burst of posts during a global event?',
    options: [
      {
        text: 'Posts are acknowledged quickly and the event stream buffers fan-out work, which scales on consumer lag',
        correct: true,
      },
      { text: 'New posts are rejected until the burst ends' },
      { text: 'Fan-out happens synchronously before acknowledging each post' },
    ],
    explanation: 'Asynchronous processing turns overload into seconds of delay.',
  },
  {
    prompt: 'Why is the search index partitioned by time?',
    options: [
      {
        text: 'Most searches want recent posts, so small recent partitions are searched first and updated frequently',
        correct: true,
      },
      { text: 'Old posts cannot be indexed' },
      { text: 'Time partitioning removes the need for an inverted index' },
    ],
    explanation: 'Recent data changes quickly; older segments can be immutable.',
  },
  {
    prompt: 'Which engagement-count design suits posts that receive thousands of likes per second?',
    options: [
      { text: 'Sharded counters with a cached sum', correct: true },
      { text: 'A single row updated with a lock for every like' },
      { text: 'Recounting all likes on every view' },
    ],
    explanation: 'Sharding spreads write contention; caching serves reads.',
  },
  {
    prompt: 'What are advantages of client-side load balancing for internal calls?',
    multi: true,
    options: [
      { text: 'No extra network hop through a central balancer', correct: true },
      { text: 'Callers can balance using their own observed latency and errors', correct: true },
      { text: 'No client library or sidecar is needed' },
    ],
    explanation: 'The logic must live somewhere near the caller, in a library or sidecar.',
  },
])
