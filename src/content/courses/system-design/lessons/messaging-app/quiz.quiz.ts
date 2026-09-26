import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which component routes a message to the gateway holding the recipient’s connection?',
    options: [
      { text: 'The message service, using the session directory', correct: true },
      { text: 'The CDN' },
      { text: 'The push notification provider' },
    ],
    explanation: 'The directory maps devices to gateways.',
  },
  {
    prompt: 'Which mechanisms together give users an exactly-once experience?',
    multi: true,
    options: [
      { text: 'Retries until acknowledgement', correct: true },
      { text: 'Client-generated message IDs for deduplication', correct: true },
      { text: 'Deduplication on the receiving device', correct: true },
      { text: 'Discarding messages that are not delivered within one second' },
    ],
    explanation: 'Retries ensure delivery; IDs remove duplicates.',
  },
  {
    prompt: 'How does an offline device receive its messages?',
    options: [
      {
        text: 'It is woken by a push notification, reconnects and syncs from its inbox after the last acknowledged message',
        correct: true,
      },
      { text: 'The sender must resend when the recipient comes online' },
      { text: 'Messages are emailed to the recipient' },
    ],
    explanation: 'Store-and-forward inboxes hold messages until acknowledged.',
  },
  {
    prompt:
      'Why is a single writer per conversation affordable despite millions of messages per second overall?',
    options: [
      {
        text: 'Each individual conversation has a low message rate, and conversations are spread across partitions',
        correct: true,
      },
      { text: 'All conversations share one global counter' },
      { text: 'Writers never fail' },
    ],
    explanation: 'Load is spread across many conversations.',
  },
  {
    prompt: 'What does end-to-end encryption prevent the server from doing?',
    multi: true,
    options: [
      { text: 'Reading message content', correct: true },
      { text: 'Indexing messages for server-side search', correct: true },
      { text: 'Routing ciphertext to the recipient’s device' },
    ],
    explanation: 'The server can still relay ciphertext and handle metadata.',
  },
  {
    prompt: 'For groups of up to a few hundred members, how are messages delivered?',
    options: [
      { text: 'Fan-out on write: a copy or pointer for each member device’s inbox', correct: true },
      { text: 'Each member polls every other member directly' },
      { text: 'Group messages are only stored on the sender’s device' },
    ],
    explanation: 'Small groups make per-device fan-out affordable and uniform.',
  },
])
