import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is a key limitation of DNS-based global load balancing?',
    options: [
      { text: 'It cannot return different answers to different clients' },
      { text: 'Cached answers delay failover until TTLs expire', correct: true },
      { text: 'It only works for IPv6' },
    ],
    explanation: 'Resolvers and clients cache DNS answers, so changes take effect gradually.',
  },
  {
    prompt:
      'Which load balancer can route /api requests and /static requests to different services?',
    options: [{ text: 'Layer 4' }, { text: 'Layer 7', correct: true }, { text: 'Neither' }],
    explanation: 'Only layer-7 balancers see HTTP paths and headers.',
  },
  {
    prompt: 'How does anycast direct users to a nearby site?',
    options: [
      {
        text: 'Many sites announce the same IP address and routing delivers traffic to the nearest one',
        correct: true,
      },
      { text: 'The client pings every site and picks the fastest' },
      { text: 'A central server redirects each request' },
    ],
    explanation:
      'Anycast relies on Internet routing protocols to reach the topologically nearest announcement.',
  },
])
