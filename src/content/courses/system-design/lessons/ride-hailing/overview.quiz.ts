import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'What distinguishes the spatial problem in ride-hailing from a business proximity service?',
    options: [
      {
        text: 'Drivers move constantly, so the index must absorb frequent location updates',
        correct: true,
      },
      { text: 'Drivers never change location' },
      { text: 'Ride-hailing does not need a spatial index' },
    ],
    explanation: 'Moving objects turn a read-mostly index into a write-heavy one.',
  },
  {
    prompt: 'Why model a trip as an explicit state machine?',
    options: [
      {
        text: 'It makes valid transitions clear and lets the system recover state after failures',
        correct: true,
      },
      { text: 'It removes the need for a database' },
      { text: 'It makes location updates faster' },
    ],
    explanation: 'Persisted, validated transitions give correctness and recoverability.',
  },
  {
    prompt: 'Which invariant must matching always preserve?',
    options: [
      { text: 'A driver is never assigned to two active trips at the same time', correct: true },
      { text: 'Every rider gets the closest driver on Earth' },
      { text: 'Drivers accept every offer' },
    ],
    explanation: 'Double assignment is the core correctness risk in matching.',
  },
])
