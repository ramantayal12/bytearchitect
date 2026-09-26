import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why did adding capacity to the front-end fleet cause failures?',
    options: [
      {
        text: 'Each server needed a thread per peer, and the new total exceeded the OS thread limit',
        correct: true,
      },
      { text: 'The new servers had the wrong software version' },
      { text: 'The back-end storage ran out of disk' },
    ],
    explanation: 'Per-peer threads grow with fleet size until they hit a hard limit.',
  },
  {
    prompt: 'What pattern makes per-peer connections dangerous at scale?',
    options: [
      {
        text: 'Total cost grows as N² across the fleet, and per-node cost grows with N',
        correct: true,
      },
      { text: 'It reduces the number of threads needed' },
      { text: 'It only works with an odd number of servers' },
    ],
    explanation: 'Prefer designs with constant or bounded per-node cost.',
  },
  {
    prompt: 'How does cellularization help?',
    options: [
      {
        text: 'Independent cells limit the blast radius of a bad change or scaling limit',
        correct: true,
      },
      { text: 'It makes every server aware of every other server' },
      { text: 'It removes the need for monitoring' },
    ],
    explanation: 'Problems stay contained within one cell.',
  },
])
