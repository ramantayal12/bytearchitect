import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which approach captures the experience of every real user device and network?',
    options: [
      { text: 'Synthetic monitoring' },
      { text: 'Real user monitoring', correct: true },
      { text: 'Server logs' },
    ],
    explanation: 'RUM reports what actual users experience.',
  },
  {
    prompt: 'Why can a traffic drop be a sign of an outage?',
    options: [
      {
        text: 'Users who cannot reach the service generate no server-side errors, only missing traffic',
        correct: true,
      },
      { text: 'Traffic always drops before deployments' },
      { text: 'Servers stop counting requests during outages' },
    ],
    explanation: 'Comparing traffic to seasonal baselines can reveal hidden outages.',
  },
  {
    prompt: 'Which dimensions are useful for aggregating client reports?',
    options: [
      { text: 'Country or region', correct: true },
      { text: 'ISP', correct: true },
      { text: 'App version', correct: true },
      { text: 'Individual user password' },
    ],
    explanation:
      'Grouping by region, network and version isolates the cause; passwords are never collected.',
  },
  {
    prompt:
      'What is the benefit of synthetic probes checking individual layers such as DNS and TLS?',
    options: [
      { text: 'They help pinpoint which layer failed', correct: true },
      { text: 'They replace the need for real user monitoring entirely' },
      { text: 'They make pages load faster' },
    ],
    explanation: 'Layer-by-layer timing isolates the failure point.',
  },
  {
    prompt: 'Why should alerting rely on aggregates rather than individual client reports?',
    options: [
      {
        text: 'Client data is noisy due to slow devices, flaky networks and wrong clocks',
        correct: true,
      },
      { text: 'Individual reports are always wrong' },
      { text: 'Aggregates are required by law' },
    ],
    explanation: 'Changes relative to baselines are more reliable signals.',
  },
  {
    prompt: 'What should the client SDK do when the device is offline?',
    options: [
      { text: 'Store reports locally and send them later', correct: true },
      { text: 'Discard all reports' },
      { text: 'Retry continuously, draining the battery' },
    ],
    explanation: 'Buffering preserves data without wasting resources.',
  },
])
