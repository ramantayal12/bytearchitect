import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why should latency dashboards show percentiles such as p99 rather than only averages?',
    options: [
      { text: 'Averages can hide a significant fraction of very slow requests', correct: true },
      { text: 'Percentiles are cheaper to compute' },
      { text: 'Averages are always higher' },
    ],
    explanation: 'Tail latency affects real users and is invisible in averages.',
  },
  {
    prompt: 'Why annotate charts with deployment markers?',
    options: [
      {
        text: 'Most incidents are caused by changes, so correlation speeds diagnosis',
        correct: true,
      },
      { text: 'To make charts more colorful' },
      { text: 'To reduce storage needs' },
    ],
    explanation: 'Seeing a spike align with a deployment points directly at the likely cause.',
  },
  {
    prompt: 'Which techniques keep dashboards fast during incidents?',
    options: [
      { text: 'Recording rules', correct: true },
      { text: 'Downsampled data for long ranges', correct: true },
      { text: 'Query result caching', correct: true },
      { text: 'Querying raw 10-second data for every 1-year chart' },
    ],
    explanation: 'Raw data over long ranges is slow and unnecessary.',
  },
])
