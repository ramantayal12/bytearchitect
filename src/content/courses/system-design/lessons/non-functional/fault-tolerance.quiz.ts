import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the difference between a fault and a failure?',
    options: [
      { text: 'They are the same thing' },
      {
        text: 'A fault is a component deviating from spec; a failure is the whole system not providing its service',
        correct: true,
      },
      { text: 'A failure is temporary; a fault is permanent' },
    ],
    explanation: 'Fault tolerance aims to prevent component faults from becoming system failures.',
  },
  {
    prompt: 'What is “split brain” during failover?',
    options: [
      { text: 'Two nodes both believing they are the primary', correct: true },
      { text: 'A database table split across two disks' },
      { text: 'A request that is processed twice by the same node' },
    ],
    explanation: 'Split brain can corrupt data; consensus-based election and fencing prevent it.',
  },
  {
    prompt: 'Which techniques limit the blast radius of a fault?',
    options: [
      { text: 'Bulkheads', correct: true },
      { text: 'Cell-based architecture', correct: true },
      { text: 'Sharing a single thread pool for all dependencies' },
      { text: 'Circuit breakers', correct: true },
    ],
    explanation: 'Sharing one pool lets a single slow dependency exhaust resources for everything.',
  },
])
