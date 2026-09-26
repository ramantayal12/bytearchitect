import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why is desired-state reconciliation more robust than pushing install commands?',
    options: [
      {
        text: 'Hosts that were down or missed a message converge to the desired version when they next reconcile',
        correct: true,
      },
      { text: 'It avoids the need for any database' },
      { text: 'It makes artifacts smaller' },
    ],
    explanation: 'Agents continuously move actual state towards desired state.',
  },
  {
    prompt: 'How does peer-assisted distribution help deploy a large artifact to 50,000 hosts?',
    options: [
      {
        text: 'Hosts fetch pieces from peers, so the central repository is not overwhelmed',
        correct: true,
      },
      { text: 'Each host builds the artifact itself' },
      { text: 'Artifacts are emailed to hosts' },
    ],
    explanation: 'Load spreads across many machines instead of one repository.',
  },
  {
    prompt: 'During bake time, what does the health analyzer compare?',
    options: [
      {
        text: 'Errors, latency and key metrics of hosts on the new version versus hosts on the old version',
        correct: true,
      },
      { text: 'The size of the old and new artifacts' },
      { text: 'Build times of the two versions' },
    ],
    explanation: 'Side-by-side comparison reveals regressions caused by the new version.',
  },
])
