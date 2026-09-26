import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Roughly how large is a spatial index of IDs and coordinates for 200 million businesses?',
    options: [
      { text: 'A few gigabytes', correct: true },
      { text: 'Several petabytes' },
      { text: 'A few kilobytes' },
    ],
    explanation: 'About 24 bytes per entry × 200 million is under 5 GB before overhead.',
  },
  {
    prompt: 'Given that the index fits in memory, how should read capacity be scaled?',
    options: [
      { text: 'Replicate the entire index on many servers', correct: true },
      { text: 'Shard the index across hundreds of servers' },
      { text: 'Store the index only on disk' },
    ],
    explanation: 'Full replicas avoid scatter-gather and scale reads linearly.',
  },
  {
    prompt:
      'Which requirement allows the index to be rebuilt periodically rather than updated instantly?',
    options: [
      { text: 'Eventual consistency for business updates', correct: true },
      { text: 'Low latency for search' },
      { text: 'Privacy of user locations' },
    ],
    explanation: 'A new or edited business can take minutes to appear in results.',
  },
])
