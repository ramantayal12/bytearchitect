import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the main purpose of a canary deployment?',
    options: [
      {
        text: 'Expose a small share of hosts or traffic to the new version first to limit the blast radius',
        correct: true,
      },
      { text: 'Deploy to every host at once for speed' },
      { text: 'Test the build on a developer’s laptop' },
    ],
    explanation: 'Problems are caught while only a little traffic is affected.',
  },
  {
    prompt: 'What is a drawback of blue-green deployment?',
    options: [
      { text: 'It needs roughly double capacity while both environments exist', correct: true },
      { text: 'Rollback is impossible' },
      { text: 'Traffic can never be switched' },
    ],
    explanation: 'A full second environment runs during the switch.',
  },
  {
    prompt: 'Why must the deployment system not depend on the services it deploys?',
    options: [
      {
        text: 'Engineers must be able to ship fixes during an incident affecting those services',
        correct: true,
      },
      { text: 'To reduce build times' },
      { text: 'Because services cannot call each other' },
    ],
    explanation: 'Circular dependencies can make outages impossible to fix.',
  },
])
