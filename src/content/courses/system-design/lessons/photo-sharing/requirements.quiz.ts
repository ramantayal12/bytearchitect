import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: '100 million photos per day at 3 MB each is how much original storage per day?',
    options: [{ text: '30 TB' }, { text: '300 TB', correct: true }, { text: '3 PB' }],
    explanation: '10⁸ × 3 × 10⁶ bytes = 3 × 10¹⁴ bytes = 300 TB.',
  },
  {
    prompt: 'Why should location metadata be stripped from uploaded files by default?',
    options: [
      {
        text: 'Embedded GPS coordinates could reveal where users live or are, violating privacy',
        correct: true,
      },
      { text: 'Metadata makes images blurry' },
      { text: 'CDNs reject images with metadata' },
    ],
    explanation: 'Users should explicitly choose to share a location.',
  },
  {
    prompt: 'What does the read bandwidth estimate of over a terabit per second imply?',
    options: [
      {
        text: 'Images must be delivered by CDNs using appropriately small variants',
        correct: true,
      },
      { text: 'Images should be served from the metadata database' },
      { text: 'Users should download originals' },
    ],
    explanation: 'Only globally distributed caches can serve this volume efficiently.',
  },
])
