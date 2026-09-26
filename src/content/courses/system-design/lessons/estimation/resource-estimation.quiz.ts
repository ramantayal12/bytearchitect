import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      '20 million photos of 500 KB are uploaded per day. Approximately how much new storage is needed per day before replication?',
    options: [{ text: '1 TB' }, { text: '10 TB', correct: true }, { text: '100 TB' }],
    explanation: '20 × 10^6 × 0.5 MB = 10^7 MB = 10 TB.',
  },
  {
    prompt:
      'An estimate shows 600 Gbps of peak egress for images. Which design decision does this most strongly justify?',
    options: [
      { text: 'Using a CDN to serve images from edge locations', correct: true },
      { text: 'Adding more application servers' },
      { text: 'Switching to a relational database' },
    ],
    explanation: 'Heavy egress of static content is best offloaded to a CDN.',
  },
  {
    prompt: 'What should you do with each estimate during an interview?',
    options: [
      { text: 'Compute it to three decimal places' },
      { text: 'Connect it to a concrete design decision', correct: true },
      { text: 'Skip it if the numbers are large' },
    ],
    explanation:
      'Estimates are only useful when they justify choices such as caching, sharding or a CDN.',
  },
])
