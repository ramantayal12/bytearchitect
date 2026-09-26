import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the key difference between pub-sub and a point-to-point queue?',
    options: [
      {
        text: 'Pub-sub delivers each message to every subscriber; a queue delivers it to one consumer',
        correct: true,
      },
      { text: 'Pub-sub never stores messages' },
      { text: 'Queues support more consumers than pub-sub' },
    ],
    explanation: 'Pub-sub broadcasts; queues distribute work.',
  },
  {
    prompt:
      'A new fraud-detection service needs order events. What must change in the order service with pub-sub?',
    options: [
      { text: 'Nothing — the fraud service subscribes to the topic', correct: true },
      { text: 'It must call the fraud service directly' },
      { text: 'It must publish to a new topic' },
    ],
    explanation: 'Loose coupling lets subscribers be added independently.',
  },
  {
    prompt: 'Which are typical pub-sub use cases?',
    options: [
      { text: 'Streaming events into analytics', correct: true },
      { text: 'Broadcasting cache invalidations', correct: true },
      { text: 'Propagating domain events between services', correct: true },
      { text: 'Storing user passwords' },
    ],
    explanation: 'Password storage is unrelated to event distribution.',
  },
])
