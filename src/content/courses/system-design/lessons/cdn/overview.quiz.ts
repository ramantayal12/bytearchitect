import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which problems does a CDN primarily address?',
    options: [
      { text: 'High latency for distant users', correct: true },
      { text: 'Origin server load from repeated requests', correct: true },
      { text: 'Expensive long-haul bandwidth', correct: true },
      { text: 'Complex database joins' },
    ],
    explanation: 'CDNs cache content near users; they do not change database query behavior.',
  },
  {
    prompt: 'Why does distance matter for latency even on fast networks?',
    options: [
      {
        text: 'Signals travel at a finite speed and each request needs multiple round trips',
        correct: true,
      },
      { text: 'Distant servers use slower CPUs' },
      { text: 'Packets are compressed differently over long distances' },
    ],
    explanation: 'Propagation delay adds up across TCP, TLS and HTTP round trips.',
  },
  {
    prompt: 'In a design, when should you most clearly add a CDN?',
    options: [
      {
        text: 'When serving large volumes of static or media content to users in many regions',
        correct: true,
      },
      { text: 'When processing financial transactions' },
      { text: 'When running batch analytics jobs' },
    ],
    explanation: 'CDNs shine for cacheable content consumed by geographically distributed users.',
  },
])
