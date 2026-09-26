import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Two independent replicas are each 99% available, and either can serve requests. What is the combined availability?',
    options: [{ text: '98%' }, { text: '99%' }, { text: '99.99%', correct: true }],
    explanation: 'Both must fail for an outage: 1 − 0.01 × 0.01 = 0.9999.',
  },
  {
    prompt: 'Which change most directly reduces MTTR?',
    options: [
      { text: 'Automated rollback when error rates spike', correct: true },
      { text: 'Buying more expensive disks' },
      { text: 'Adding more features' },
    ],
    explanation: 'Automation shortens the time from failure to recovery.',
  },
  {
    prompt: 'Which are characteristics of horizontal scaling?',
    options: [
      { text: 'Adding more machines', correct: true },
      { text: 'Requires distributing data or load across nodes', correct: true },
      { text: 'Has a hard ceiling set by the largest available machine' },
    ],
    explanation: 'The hard ceiling applies to vertical scaling.',
  },
  {
    prompt: 'What is the most important enabler for horizontally scaling application servers?',
    options: [
      { text: 'Keeping them stateless', correct: true },
      { text: 'Giving each server its own database' },
      { text: 'Using sticky sessions everywhere' },
    ],
    explanation: 'Stateless servers can be added or removed freely behind a load balancer.',
  },
  {
    prompt: 'Which are components of maintainability?',
    options: [
      { text: 'Operability', correct: true },
      { text: 'Simplicity', correct: true },
      { text: 'Evolvability', correct: true },
      { text: 'Throughput' },
    ],
    explanation: 'Throughput is a performance characteristic, not a maintainability property.',
  },
  {
    prompt: 'A circuit breaker opens after repeated failures to a dependency. What happens next?',
    options: [
      {
        text: 'Requests to that dependency fail fast for a while instead of waiting',
        correct: true,
      },
      { text: 'The dependency is automatically restarted' },
      { text: 'All requests are retried in a loop' },
    ],
    explanation:
      'Failing fast protects the caller’s resources and gives the dependency time to recover.',
  },
  {
    prompt: 'Why is request-based availability often preferred to time-based availability?',
    options: [
      {
        text: 'It reflects the proportion of users actually affected by partial outages',
        correct: true,
      },
      { text: 'It is always higher' },
      { text: 'It does not require monitoring' },
    ],
    explanation: 'A partial outage affecting 5% of requests is counted proportionally.',
  },
  {
    prompt: 'A system is highly available but occasionally corrupts data. Which property is weak?',
    options: [
      { text: 'Scalability' },
      { text: 'Reliability', correct: true },
      { text: 'Elasticity' },
    ],
    explanation: 'Reliability includes producing correct results.',
  },
])
