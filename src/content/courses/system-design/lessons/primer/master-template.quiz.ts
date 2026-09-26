import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'In a 45-minute interview, which SCALED step deserves the most time?',
    options: [
      { text: 'Evolve (deep dives)', correct: true },
      { text: 'Capacity estimation' },
      { text: 'Scope' },
    ],
    explanation: 'About 15 minutes go to the hardest parts of the design.',
  },
  {
    prompt: 'How should you choose a partition key?',
    options: [
      { text: 'So common queries hit one shard and load is spread evenly', correct: true },
      { text: 'Always use the creation timestamp' },
      { text: 'Pick the column with the longest values' },
    ],
    explanation: 'Access patterns drive partitioning.',
  },
  {
    prompt: 'You are running short on time. What should you compress?',
    options: [
      {
        text: 'The layout walkthrough, keeping time to defend trade-offs and failures',
        correct: true,
      },
      { text: 'The defend step' },
      { text: 'Requirements, skipping them entirely' },
    ],
    explanation: 'Trade-offs and failure handling carry significant weight.',
  },
])
