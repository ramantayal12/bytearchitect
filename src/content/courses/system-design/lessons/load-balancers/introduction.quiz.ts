import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'What happens when a server fails the load balancer’s health checks several times in a row?',
    options: [
      { text: 'The load balancer restarts the server' },
      {
        text: 'The load balancer stops routing traffic to it until it becomes healthy again',
        correct: true,
      },
      { text: 'All traffic is paused' },
    ],
    explanation: 'Health checks let the LB route around failed servers automatically.',
  },
  {
    prompt: 'Why do stateless application servers simplify load balancing?',
    options: [
      {
        text: 'Any server can handle any request, so no sticky sessions are needed',
        correct: true,
      },
      { text: 'Stateless servers do not need health checks' },
      { text: 'Stateless servers are faster at computation' },
    ],
    explanation:
      'Keeping session state in a shared store frees the LB to route each request anywhere.',
  },
  {
    prompt: 'Which responsibilities are commonly handled by load balancers?',
    options: [
      { text: 'TLS termination', correct: true },
      { text: 'Health checking servers', correct: true },
      { text: 'Running database migrations' },
      { text: 'Rate limiting abusive traffic', correct: true },
    ],
    explanation: 'Database migrations are unrelated to traffic distribution.',
  },
])
