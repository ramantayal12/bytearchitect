import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Which signal category would detect a sudden drop in completed orders when all servers look healthy?',
    options: [
      { text: 'Hardware metrics' },
      { text: 'Business metrics', correct: true },
      { text: 'Disk I/O' },
    ],
    explanation: 'Business metrics reveal user-facing problems that technical metrics can miss.',
  },
  {
    prompt: 'Which metric type is best for computing latency percentiles?',
    options: [{ text: 'Counter' }, { text: 'Gauge' }, { text: 'Histogram', correct: true }],
    explanation: 'Histograms record distributions of values.',
  },
  {
    prompt: 'What is alert fatigue?',
    options: [
      {
        text: 'Responders ignoring alerts because there are too many non-actionable ones',
        correct: true,
      },
      { text: 'Servers slowing down from sending alerts' },
      { text: 'Running out of alert storage' },
    ],
    explanation: 'Actionable, symptom-based alerts reduce noise.',
  },
  {
    prompt: 'Which are advantages of pull-based metric collection?',
    options: [
      { text: 'Dead targets are detected because scrapes fail', correct: true },
      { text: 'The monitoring system controls collection load', correct: true },
      { text: 'Works best for clients behind firewalls' },
    ],
    explanation: 'Clients behind firewalls usually need push.',
  },
  {
    prompt:
      '100,000 servers each emit 100 metrics every 10 seconds. How many points per second is that?',
    options: [{ text: '100,000' }, { text: '1,000,000', correct: true }, { text: '10,000,000' }],
    explanation: '100,000 × 100 / 10 = 1,000,000.',
  },
  {
    prompt: 'What does the USE method measure for a resource?',
    options: [
      { text: 'Utilization, saturation and errors', correct: true },
      { text: 'Users, sessions and events' },
      { text: 'Uptime, speed and efficiency' },
    ],
    explanation: 'USE is a checklist for resources such as CPUs, disks and networks.',
  },
])
