import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Why should client error reports use a separate domain, DNS provider and infrastructure?',
    options: [
      {
        text: 'So an outage of the main service does not also block the reports that reveal it',
        correct: true,
      },
      { text: 'To make reports cheaper' },
      { text: 'Because browsers require it' },
    ],
    explanation: 'Independent paths avoid shared fate with the monitored system.',
  },
  {
    prompt: 'How does the SDK limit its overhead on user devices?',
    options: [
      { text: 'Batching reports', correct: true },
      { text: 'Sampling detailed performance data', correct: true },
      { text: 'Sending a request for every user interaction immediately' },
    ],
    explanation: 'Unbatched reporting wastes battery and bandwidth.',
  },
  {
    prompt: 'Why is a queue placed in front of stream processing?',
    options: [
      { text: 'To absorb bursts of reports, such as during an outage', correct: true },
      { text: 'To encrypt reports' },
      { text: 'To sort reports alphabetically' },
    ],
    explanation: 'Outages can generate sudden floods of error reports.',
  },
])
