import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why is storing many renditions of each video a good trade-off?',
    options: [
      {
        text: 'Bandwidth is more expensive than storage, and renditions let each viewer download only what they need',
        correct: true,
      },
      { text: 'Storage is free on every cloud provider' },
      { text: 'It removes the need for a CDN' },
    ],
    explanation:
      'Over a popular video’s life, bandwidth savings far exceed the extra storage cost.',
  },
  {
    prompt:
      'A thousand viewers request the same uncached segment at the same edge at once. Which technique prevents a thousand origin requests?',
    options: [
      { text: 'Request coalescing at the edge', correct: true },
      { text: 'Increasing the segment length' },
      { text: 'Strong consistency for view counts' },
    ],
    explanation: 'Coalescing lets one upstream fetch satisfy all waiting requests.',
  },
  {
    prompt: 'What happens when an encoding worker crashes mid-job?',
    options: [
      { text: 'Its job lease expires and another worker retries the chunk', correct: true },
      { text: 'The video is permanently lost' },
      { text: 'The creator must upload the video again' },
    ],
    explanation: 'Durable queues and idempotent tasks turn crashes into delays, not data loss.',
  },
])
