import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why does fast repair improve durability?',
    options: [
      {
        text: 'It shortens the window in which additional failures could destroy remaining copies',
        correct: true,
      },
      { text: 'It reduces storage costs' },
      { text: 'It makes reads faster' },
    ],
    explanation: 'Data is lost only if enough failures overlap before repair completes.',
  },
  {
    prompt: 'How can a blob store provide read-after-write consistency?',
    options: [
      {
        text: 'By committing blob metadata to a strongly consistent store as the final step of a write',
        correct: true,
      },
      { text: 'By caching all blobs at the CDN' },
      { text: 'By using eventual consistency everywhere' },
    ],
    explanation: 'Once metadata is committed, readers find the new chunk map.',
  },
  {
    prompt: 'Which techniques reduce the cost of a blob store?',
    options: [
      { text: 'Erasure coding cold data', correct: true },
      { text: 'Lifecycle policies moving data to cheaper tiers', correct: true },
      { text: 'Storing five full replicas of everything' },
    ],
    explanation: 'Extra full replicas increase cost.',
  },
])
