import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What does the overlay graph contain?',
    options: [
      {
        text: 'Boundary nodes of cells and precomputed shortcut edges between them',
        correct: true,
      },
      { text: 'Every intersection on the planet' },
      { text: 'Only highways' },
    ],
    explanation: 'It summarizes each cell so searches can skip over cell interiors.',
  },
  {
    prompt: 'Why can live traffic be applied quickly in this design?',
    options: [
      {
        text: 'The partition depends only on topology, so only shortcut weights must be recomputed',
        correct: true,
      },
      { text: 'Traffic updates are ignored between midnight and 6 a.m.' },
      { text: 'The graph is re-partitioned from scratch every minute' },
    ],
    explanation: 'Customization reuses the partition and refreshes weights in seconds.',
  },
  {
    prompt: 'How should an edge with too few recent pings get a speed estimate?',
    options: [
      { text: 'Fall back to historical speeds for that time slot', correct: true },
      { text: 'Assume the road is closed' },
      { text: 'Use the speed of the single most recent ping' },
    ],
    explanation: 'Sparse live data is unreliable, while history captures typical conditions.',
  },
])
