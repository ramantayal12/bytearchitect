import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What does “load leveling” mean in the context of queues?',
    options: [
      { text: 'Queues absorb bursts so consumers can process at a steady rate', correct: true },
      { text: 'All servers receive exactly equal traffic' },
      { text: 'Messages are compressed to equal sizes' },
    ],
    explanation: 'Bursts accumulate in the queue instead of overwhelming downstream services.',
  },
  {
    prompt: 'How many consumers process each message in a point-to-point queue?',
    options: [
      { text: 'Exactly one', correct: true },
      { text: 'Every subscriber' },
      { text: 'None' },
    ],
    explanation: 'Broadcasting to every subscriber is the pub-sub model.',
  },
  {
    prompt: 'Which are benefits of placing a queue between two services?',
    options: [
      { text: 'Producers do not wait for slow work to finish', correct: true },
      { text: 'Producers and consumers can scale independently', correct: true },
      { text: 'Work is guaranteed to finish instantly' },
    ],
    explanation: 'Queues defer work; they do not make it instantaneous.',
  },
])
