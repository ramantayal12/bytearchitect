import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the role of service discovery in the monitoring system?',
    options: [
      { text: 'Telling collectors which targets exist as servers come and go', correct: true },
      { text: 'Storing time-series data' },
      { text: 'Sending alerts to engineers' },
    ],
    explanation: 'Dynamic fleets require an up-to-date list of targets.',
  },
  {
    prompt: 'Which component deduplicates and routes alerts to the right team?',
    options: [{ text: 'Collector' }, { text: 'Alert manager', correct: true }, { text: 'Agent' }],
    explanation: 'The alert manager groups, silences and routes notifications.',
  },
  {
    prompt: 'How does the design scale to millions of samples per second?',
    options: [
      { text: 'Sharding collectors by target', correct: true },
      { text: 'Sharding the time-series database by series', correct: true },
      { text: 'Using a single large collector' },
    ],
    explanation: 'Horizontal sharding spreads collection and storage load.',
  },
])
