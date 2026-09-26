import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the key step that allows the web tier to scale horizontally?',
    options: [
      {
        text: 'Making application servers stateless by moving session state to a shared store',
        correct: true,
      },
      { text: 'Buying a larger database server' },
      { text: 'Removing the load balancer' },
    ],
    explanation: 'Stateless servers are interchangeable.',
  },
  {
    prompt: 'What problem does sharding solve that read replicas do not?',
    options: [
      { text: 'Scaling write volume and total data size beyond one primary', correct: true },
      { text: 'Serving static assets closer to users' },
      { text: 'Sending emails asynchronously' },
    ],
    explanation: 'Replicas scale reads; shards split writes and data.',
  },
  {
    prompt: 'Why move slow tasks to background workers with a queue?',
    options: [
      {
        text: 'Requests return quickly, bursts are absorbed and workers scale independently',
        correct: true,
      },
      { text: 'Queues make tasks run faster than on any server' },
      { text: 'It removes the need for a database' },
    ],
    explanation: 'Asynchronous processing decouples user-facing latency from slow work.',
  },
])
