import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'In client-side load balancing, who chooses which backend instance handles a request?',
    options: [
      {
        text: 'The calling service, using an instance list from a service registry',
        correct: true,
      },
      { text: 'A central hardware load balancer' },
      { text: 'The DNS server for every request' },
    ],
    explanation: 'The caller’s RPC library performs discovery and selection.',
  },
  {
    prompt: 'How does the "power of two random choices" algorithm work?',
    options: [
      {
        text: 'Pick two instances at random and send the request to the less loaded one',
        correct: true,
      },
      { text: 'Send each request to two instances and use the faster reply' },
      { text: 'Always use the first two instances in the list' },
    ],
    explanation: 'It achieves near-optimal balance with very little coordination.',
  },
  {
    prompt: 'What does a service mesh sidecar provide?',
    options: [
      {
        text: 'Discovery, balancing, retries and encryption in a local proxy, uniform across languages',
        correct: true,
      },
      { text: 'A replacement for the service registry' },
      { text: 'Permanent storage for requests' },
    ],
    explanation: 'The sidecar centralizes client-side logic without a central bottleneck.',
  },
])
