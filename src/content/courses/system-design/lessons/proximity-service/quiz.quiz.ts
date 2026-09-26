import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which of these is the core technical problem of a proximity service?',
    options: [
      { text: 'Efficiently answering two-dimensional nearby queries', correct: true },
      { text: 'Encoding video for mobile devices' },
      { text: 'Ordering messages in a chat' },
    ],
    explanation: 'Spatial indexing is the heart of the design.',
  },
  {
    prompt: 'Why is the location-based service stateless apart from its read-only index?',
    options: [
      {
        text: 'So it can scale horizontally by adding replicas that each load the same snapshot',
        correct: true,
      },
      { text: 'Because it stores user sessions' },
      { text: 'Because it owns business writes' },
    ],
    explanation: 'Identical replicas behind a load balancer scale reads simply.',
  },
  {
    prompt:
      'A user in a rural area gets only two results from the nine geohash cells. What should the service do?',
    options: [
      {
        text: 'Reduce the precision to search larger cells until enough results are found',
        correct: true,
      },
      { text: 'Return an error' },
      { text: 'Increase the precision to search smaller cells' },
    ],
    explanation: 'Shorter geohashes cover larger areas.',
  },
  {
    prompt: 'Which properties favor an in-memory quadtree for business search?',
    multi: true,
    options: [
      { text: 'Business locations change rarely', correct: true },
      { text: 'Density varies greatly between areas', correct: true },
      { text: 'The whole index fits in a few gigabytes', correct: true },
      { text: 'Businesses move every few seconds' },
    ],
    explanation: 'Constantly moving objects need a different approach, covered in ride-hailing.',
  },
  {
    prompt: 'Why can a newly created business take a few minutes to appear in search?',
    options: [
      {
        text: 'Search servers load periodically built index snapshots, which is acceptable under eventual consistency',
        correct: true,
      },
      { text: 'The database is only written once per hour' },
      { text: 'Businesses must be manually approved by every server' },
    ],
    explanation: 'Batching updates into snapshots keeps searches fast and simple.',
  },
  {
    prompt: 'What advantage do H3 hexagonal cells offer?',
    options: [
      { text: 'All neighbors of a cell are equidistant from its center', correct: true },
      { text: 'They remove the need for any index' },
      { text: 'They only work for a single city' },
    ],
    explanation: 'Uniform neighbor distances simplify ring-based nearby searches.',
  },
])
