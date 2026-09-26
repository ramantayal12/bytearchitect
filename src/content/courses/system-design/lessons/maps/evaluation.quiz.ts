import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'How can the routing service support an "avoid tolls" option efficiently?',
    options: [
      {
        text: 'Maintain a separate set of customized shortcut weights for that profile',
        correct: true,
      },
      { text: 'Re-partition the graph for every request' },
      { text: 'Run a plain Dijkstra search for those requests over the whole continent' },
    ],
    explanation: 'Extra weight sets cost memory but keep every profile fast.',
  },
  {
    prompt: 'Why should autoscaling of routing servers be proactive before rush hour?',
    options: [
      {
        text: 'New servers must load gigabytes of graph data before they can serve',
        correct: true,
      },
      { text: 'Rush hour cannot be predicted' },
      { text: 'Routing servers are stateful databases' },
    ],
    explanation: 'Start-up is slow, so capacity must be added ahead of predictable peaks.',
  },
  {
    prompt: 'Why apply a threshold before suggesting a new route during navigation?',
    options: [
      { text: 'To avoid jumpy reroutes that save only a few seconds', correct: true },
      { text: 'Because rerouting is impossible while driving' },
      { text: 'To reduce the number of tiles downloaded' },
    ],
    explanation: 'Stable guidance matters more than tiny time savings.',
  },
])
