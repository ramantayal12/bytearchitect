import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why are percentiles such as p99 preferred over averages for describing latency?',
    options: [
      { text: 'They are easier to compute' },
      { text: 'They reveal the slow tail that averages hide', correct: true },
      { text: 'Averages cannot be computed for latency' },
    ],
    explanation:
      'An average can look healthy while a meaningful fraction of requests are very slow.',
  },
  {
    prompt: 'Which statements about horizontal scaling are true?',
    options: [
      { text: 'It can grow far beyond the limits of a single machine', correct: true },
      { text: 'It introduces coordination and consistency challenges', correct: true },
      { text: 'It requires no changes to how state is managed' },
    ],
    explanation:
      'Horizontal scaling usually requires stateless servers and partitioned or replicated data.',
  },
  {
    prompt:
      'Your stateless web tier is scaled out, but latency still rises under load. What should you check first?',
    options: [
      { text: 'Add even more web servers' },
      { text: 'Identify the bottleneck, such as a saturated database', correct: true },
      { text: 'Switch programming languages' },
    ],
    explanation: 'Scaling the wrong layer does not help; find the component that saturates first.',
  },
])
