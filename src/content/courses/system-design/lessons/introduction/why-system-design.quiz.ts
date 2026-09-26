import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why does code that works on a laptop often behave differently in production?',
    options: [
      { text: 'Production machines use different programming languages' },
      {
        text: 'Production runs across many machines connected by an unreliable network, with bursty traffic and failing components',
        correct: true,
      },
      { text: 'Laptops have more memory than servers' },
    ],
    explanation:
      'Distribution, unreliable networks and real-world load introduce failure modes that a single machine never shows.',
  },
  {
    prompt: 'Which statements about system design trade-offs are true?',
    options: [
      { text: 'Aggressive caching improves speed but can serve stale data', correct: true },
      { text: 'There is usually one correct design for a given problem' },
      {
        text: 'Strong consistency can reduce availability during network partitions',
        correct: true,
      },
      {
        text: 'Good designers start from requirements and choose the simplest design that meets them',
        correct: true,
      },
    ],
    explanation:
      'Design is about explicit trade-offs guided by requirements; there is rarely a single correct answer.',
  },
  {
    prompt: 'Which skill is NOT a primary goal of this course?',
    options: [
      { text: 'Estimating traffic, storage and bandwidth' },
      { text: 'Identifying bottlenecks and single points of failure' },
      { text: 'Memorizing the exact configuration of a specific company’s servers', correct: true },
      { text: 'Communicating a design clearly within a time limit' },
    ],
    explanation:
      'The course focuses on reasoning and trade-offs, not memorizing any particular company’s setup.',
  },
])
