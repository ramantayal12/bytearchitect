import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why do alert rules include a “for” duration, such as 5 minutes?',
    options: [
      { text: 'To avoid paging on brief, self-resolving spikes', correct: true },
      { text: 'To delay all alerts deliberately' },
      { text: 'To reduce storage usage' },
    ],
    explanation: 'Requiring the condition to persist reduces flapping alerts.',
  },
  {
    prompt: 'What is a dead man’s switch in monitoring?',
    options: [
      {
        text: 'An always-firing alert whose absence indicates the monitoring pipeline is broken',
        correct: true,
      },
      { text: 'A switch that shuts down servers during incidents' },
      { text: 'An alert that fires only once' },
    ],
    explanation: 'It monitors the monitor.',
  },
  {
    prompt: 'Why can time-series samples be compressed so well?',
    options: [
      { text: 'Timestamps are regular and consecutive values change slowly', correct: true },
      { text: 'Metrics are stored as text' },
      { text: 'Most samples are deleted' },
    ],
    explanation: 'Delta-of-delta and XOR encodings exploit this regularity.',
  },
])
