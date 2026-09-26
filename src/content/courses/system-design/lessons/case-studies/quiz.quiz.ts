import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'In cloud file storage, what does a file version consist of in the metadata service?',
    options: [
      { text: 'A list of content-hashed chunk identifiers plus attributes', correct: true },
      { text: 'The full file bytes' },
      { text: 'A URL to the user’s laptop' },
    ],
    explanation: 'Chunks live in the block store; metadata lists them.',
  },
  {
    prompt: 'Which mechanisms prevent selling the same seat or unit twice?',
    multi: true,
    options: [
      { text: 'Conditional updates that only change available seats', correct: true },
      { text: 'Atomic "decrement if positive" reservations', correct: true },
      { text: 'Showing cached availability on seat maps' },
    ],
    explanation: 'Cached displays can be stale; atomic operations are the final arbiter.',
  },
  {
    prompt: 'What is the purpose of a virtual waiting room?',
    options: [
      { text: 'Admit users at a sustainable rate and give them fair positions', correct: true },
      { text: 'Store tickets after purchase' },
      { text: 'Replace the payment system' },
    ],
    explanation: 'It smooths extreme spikes before they reach core systems.',
  },
  {
    prompt: 'Why does a paste service separate content from metadata?',
    options: [
      {
        text: 'Large content belongs in an object store, keeping the metadata database small and fast',
        correct: true,
      },
      { text: 'Metadata must be public while content is private' },
      { text: 'Object stores cannot store small files' },
    ],
    explanation: 'Each store handles the data shape it suits.',
  },
  {
    prompt: 'What makes a year-in-review launch feasible for hundreds of millions of users?',
    options: [
      {
        text: 'Summaries are precomputed in batch and served with a single key-value lookup',
        correct: true,
      },
      { text: 'Each summary is computed from raw events when the user opens the app' },
      { text: 'Only a few users are allowed to see their summary' },
    ],
    explanation: 'Precomputation moves heavy work away from launch time.',
  },
  {
    prompt: 'Which statements about communication APIs are true?',
    multi: true,
    options: [
      { text: 'Delivery is asynchronous, with status reported through webhooks', correct: true },
      { text: 'Carriers impose throughput limits that routing must respect', correct: true },
      { text: 'Idempotency keys make API retries safe', correct: true },
      { text: 'Every carrier returns a delivery receipt instantly' },
    ],
    explanation: 'Receipts can be delayed or missing entirely.',
  },
  {
    prompt: 'What common thread runs through the flash-sale and ticket-booking designs?',
    options: [
      {
        text: 'Protect a small, strongly consistent core with caching, admission control and asynchronous processing',
        correct: true,
      },
      { text: 'Use eventual consistency for inventory counts at checkout' },
      { text: 'Scale by removing all caches' },
    ],
    explanation: 'Correctness is concentrated in a protected hot path.',
  },
])
