import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What common theme appears in all three outages?',
    options: [
      {
        text: 'A routine operational change triggered a failure that was amplified by the system’s own mechanisms',
        correct: true,
      },
      { text: 'Malicious attackers caused each outage' },
      { text: 'Hardware failures in a single server' },
    ],
    explanation: 'Maintenance, capacity additions and automated scaling were the triggers.',
  },
  {
    prompt: 'Which designs reduce blast radius?',
    multi: true,
    options: [
      { text: 'Cellular architecture', correct: true },
      { text: 'Staged rollouts of network and configuration changes', correct: true },
      { text: 'Limits on what a single command can affect', correct: true },
      { text: 'Applying every change to all regions simultaneously' },
    ],
    explanation: 'Simultaneous global changes maximize blast radius.',
  },
  {
    prompt: 'Why should monitoring and status pages not depend on the systems they observe?',
    options: [
      { text: 'They become unavailable exactly when they are needed most', correct: true },
      { text: 'It makes dashboards more colorful' },
      { text: 'Independent monitoring is cheaper' },
    ],
    explanation: 'All three events show observability or communication impaired by the outage.',
  },
  {
    prompt: 'How can a local health rule cause a global outage?',
    options: [
      {
        text: 'If every location applies it at once for the same reason, all capacity is withdrawn simultaneously',
        correct: true,
      },
      { text: 'Health rules only run in one location' },
      { text: 'Health rules cannot fail' },
    ],
    explanation: 'Correlated decisions turn a partial failure into a total one.',
  },
  {
    prompt: 'Why is slow restart a reliability risk?',
    options: [
      {
        text: 'Recovery takes longest precisely when a fleet-wide restart is needed',
        correct: true,
      },
      { text: 'Slow restarts improve cache hit rates' },
      { text: 'It has no effect on outages' },
    ],
    explanation: 'Cold-start costs directly extend outage duration.',
  },
  {
    prompt: 'What is a hidden scaling hazard revealed by the Kinesis event?',
    options: [
      {
        text: 'Per-node resources, such as threads, that grow with the size of the fleet',
        correct: true,
      },
      { text: 'Using too few servers' },
      { text: 'Storing data in multiple regions' },
    ],
    explanation: 'Such costs grow silently until they hit a hard limit.',
  },
  {
    prompt: 'What should load and chaos tests deliberately examine?',
    options: [
      {
        text: 'How clients and systems behave under congestion and failure, including retry and back-off logic',
        correct: true,
      },
      { text: 'Only the happy path at normal load' },
      { text: 'The color of error pages' },
    ],
    explanation: 'Latent failure behavior only appears under stress.',
  },
])
