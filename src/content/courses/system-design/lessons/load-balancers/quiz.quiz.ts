import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which tier decides which region a user’s request is sent to?',
    options: [
      { text: 'Local load balancer' },
      { text: 'Global load balancing (DNS or anycast)', correct: true },
      { text: 'Database proxy' },
    ],
    explanation: 'Global load balancing picks a region; local balancing picks a server within it.',
  },
  {
    prompt:
      'A load balancer hashes the user ID to select a server so that per-user caches stay warm. What technique minimizes cache disruption when servers are added?',
    options: [
      { text: 'Round robin' },
      { text: 'Consistent hashing', correct: true },
      { text: 'Random selection' },
    ],
    explanation:
      'Consistent hashing moves only a small fraction of keys when the server set changes.',
  },
  {
    prompt: 'Which are advantages of layer-4 load balancers over layer-7?',
    options: [
      { text: 'Lower overhead and higher throughput', correct: true },
      { text: 'Routing based on URL paths' },
      { text: 'Simplicity of operating on connections rather than requests', correct: true },
    ],
    explanation: 'Path-based routing requires layer 7.',
  },
  {
    prompt:
      'How can the load balancer itself be prevented from becoming a single point of failure?',
    options: [
      { text: 'Deploying an active–passive pair with a shared virtual IP', correct: true },
      { text: 'Running an active–active cluster behind DNS or anycast', correct: true },
      { text: 'Using a single, very large load balancer' },
    ],
    explanation: 'Redundant load balancers remove the single point of failure.',
  },
  {
    prompt: 'Why can overly strict health checks be dangerous?',
    options: [
      {
        text: 'A shared dependency slowing down could mark every server unhealthy at once',
        correct: true,
      },
      { text: 'They use too much bandwidth' },
      { text: 'They prevent TLS termination' },
    ],
    explanation: 'Removing all servers turns a partial degradation into a total outage.',
  },
  {
    prompt: 'What is TLS termination at the load balancer?',
    options: [
      {
        text: 'Decrypting HTTPS traffic at the LB so backend servers handle plain requests',
        correct: true,
      },
      { text: 'Blocking all encrypted traffic' },
      { text: 'Closing idle TCP connections' },
    ],
    explanation:
      'Terminating TLS centrally offloads cryptographic work and certificate management from servers.',
  },
  {
    prompt: 'What does client-side load balancing rely on?',
    options: [
      { text: 'A service registry listing healthy instances', correct: true },
      { text: 'A hardware load balancer in every rack' },
      { text: 'DNS round robin only' },
    ],
    explanation: 'Clients or sidecars fetch instance lists and choose targets themselves.',
  },
])
