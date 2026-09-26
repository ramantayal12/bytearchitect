import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why should monitoring infrastructure be isolated from the system it monitors?',
    options: [
      { text: 'So visibility is not lost when the monitored system fails', correct: true },
      { text: 'To reduce the number of dashboards' },
      { text: 'Because monitoring data is confidential' },
    ],
    explanation: 'Shared fate means the monitoring could fail at exactly the wrong time.',
  },
  {
    prompt: 'Which problems can only be seen from the client side?',
    options: [
      {
        text: 'Requests that never reach the data center due to DNS or routing failures',
        correct: true,
      },
      { text: 'A full disk on a database server' },
      { text: 'Slow page rendering on a user’s device', correct: true },
    ],
    explanation: 'Servers cannot observe requests they never receive or rendering on devices.',
  },
  {
    prompt: 'Which are core functions of a monitoring system?',
    options: [
      { text: 'Collecting metrics', correct: true },
      { text: 'Alerting', correct: true },
      { text: 'Visualizing data', correct: true },
      { text: 'Serving user traffic' },
    ],
    explanation: 'Monitoring observes the system; it does not serve its traffic.',
  },
])
