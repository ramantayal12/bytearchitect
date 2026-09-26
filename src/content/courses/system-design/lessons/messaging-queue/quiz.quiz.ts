import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'A consumer crashes after receiving a message but before deleting it. What happens?',
    options: [
      {
        text: 'After the visibility timeout, the message becomes visible and is redelivered',
        correct: true,
      },
      { text: 'The message is lost' },
      { text: 'The queue stops delivering all messages' },
    ],
    explanation: 'Visibility timeouts enable recovery from consumer failures.',
  },
  {
    prompt: 'Which delivery semantics is the most common default for messaging queues?',
    options: [
      { text: 'At most once' },
      { text: 'At least once', correct: true },
      { text: 'Exactly once over the network' },
    ],
    explanation:
      'Duplicates are usually preferable to loss, and consumers handle them idempotently.',
  },
  {
    prompt: 'Why can global FIFO ordering limit throughput?',
    options: [
      { text: 'All messages must pass through a single ordered sequence', correct: true },
      { text: 'FIFO messages are larger' },
      { text: 'FIFO queues cannot be replicated' },
    ],
    explanation: 'Per-key ordering avoids serializing all messages.',
  },
  {
    prompt: 'Which components make up the scalable queue architecture?',
    options: [
      { text: 'Stateless front-end servers', correct: true },
      { text: 'A metadata store mapping queues to clusters', correct: true },
      { text: 'Replicated back-end clusters storing messages', correct: true },
      { text: 'A single global lock server for every message' },
    ],
    explanation: 'A global lock would be a severe bottleneck.',
  },
  {
    prompt:
      'An email-sending consumer may receive the same message twice. How should it avoid sending duplicate emails?',
    options: [
      { text: 'Record processed message IDs and skip ones already handled', correct: true },
      { text: 'Increase the visibility timeout to infinity' },
      { text: 'Acknowledge before sending' },
    ],
    explanation:
      'Idempotent processing handles duplicates; acknowledging first risks losing emails.',
  },
  {
    prompt: 'What is the purpose of retention periods for unconsumed messages?',
    options: [
      {
        text: 'Protect messages when consumers are down, while bounding storage growth',
        correct: true,
      },
      { text: 'Speed up message delivery' },
      { text: 'Guarantee ordering' },
    ],
    explanation: 'Messages wait for recovering consumers but are eventually cleaned up.',
  },
  {
    prompt: 'Which replication approach naturally supports strict ordering within a queue?',
    options: [
      { text: 'Primary–secondary', correct: true },
      { text: 'Leaderless any-replica writes' },
      { text: 'No replication' },
    ],
    explanation: 'A single primary serializes all operations on the queue.',
  },
])
