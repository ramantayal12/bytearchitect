import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why are year-in-review summaries precomputed rather than computed on request?',
    options: [
      {
        text: 'Scanning a year of events per request is too slow and would overwhelm compute at launch',
        correct: true,
      },
      { text: 'Users prefer outdated data' },
      { text: 'Key-value stores cannot be queried at launch' },
    ],
    explanation: 'Batch precomputation moves heavy work away from the launch spike.',
  },
  {
    prompt: 'What makes batch results easier to get correct?',
    options: [
      {
        text: 'Inputs are frozen at a cut-off, so jobs are reproducible and can be rerun after fixes',
        correct: true,
      },
      { text: 'Batch jobs never have bugs' },
      { text: 'Results are never validated' },
    ],
    explanation: 'Frozen inputs allow validation and reruns before launch.',
  },
  {
    prompt: 'Which techniques help manage the launch-day spike?',
    multi: true,
    options: [
      { text: 'Pre-scaling the serving tier', correct: true },
      { text: 'Gradual rollout by region with feature flags', correct: true },
      { text: 'Pre-positioning static assets on the CDN', correct: true },
      { text: 'Computing summaries synchronously when users open the app' },
    ],
    explanation: 'On-demand computation is exactly what precomputation avoids.',
  },
])
