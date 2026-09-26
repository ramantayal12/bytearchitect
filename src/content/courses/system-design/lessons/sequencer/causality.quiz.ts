import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Node A has Lamport clock 7 and receives a message stamped 12. What is its clock after receiving?',
    options: [{ text: '8' }, { text: '12' }, { text: '13', correct: true }],
    explanation: 'max(7, 12) + 1 = 13.',
  },
  {
    prompt: 'What can vector clocks determine that Lamport clocks cannot?',
    options: [
      { text: 'Whether two events are concurrent', correct: true },
      { text: 'The exact wall-clock time of an event' },
      { text: 'The size of a message' },
    ],
    explanation:
      'Lamport timestamps order events but cannot distinguish causality from concurrency.',
  },
  {
    prompt: 'Why do some databases wait out clock uncertainty before committing?',
    options: [
      {
        text: 'To guarantee that later transactions always receive larger timestamps',
        correct: true,
      },
      { text: 'To save disk space' },
      { text: 'To avoid using NTP' },
    ],
    explanation: 'Commit wait ensures timestamps respect real-time ordering across machines.',
  },
])
