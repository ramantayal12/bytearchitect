import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which algorithm allows short bursts while enforcing an average rate?',
    options: [
      { text: 'Token bucket', correct: true },
      { text: 'Leaky bucket' },
      { text: 'Fixed window' },
    ],
    explanation: 'A full bucket can serve a burst up to its capacity.',
  },
  {
    prompt: 'Which key would best limit abuse of a login endpoint?',
    options: [
      { text: 'Username and IP address combined', correct: true },
      { text: 'The name of the endpoint only' },
      { text: 'The server’s hostname' },
    ],
    explanation: 'Combining account and source limits brute-force attempts effectively.',
  },
  {
    prompt: 'What does the sliding window counter approximate?',
    options: [
      {
        text: 'The request count over a true sliding window, using two fixed-window counters',
        correct: true,
      },
      { text: 'The number of tokens in a bucket' },
      { text: 'The queue length of a leaky bucket' },
    ],
    explanation: 'It weights the previous window by its overlap with the sliding window.',
  },
  {
    prompt: 'Which statements about distributed rate limiting are true?',
    options: [
      { text: 'Check-and-update must be atomic to avoid races', correct: true },
      { text: 'Local counting reduces latency but may allow small overshoots', correct: true },
      { text: 'Each server should keep its own independent limit with no sharing' },
    ],
    explanation: 'Independent limits multiply a client’s effective quota.',
  },
  {
    prompt: 'Which response headers help well-behaved clients respect limits?',
    options: [
      { text: 'Retry-After', correct: true },
      { text: 'X-RateLimit-Remaining', correct: true },
      { text: 'Content-Encoding' },
    ],
    explanation: 'Rate-limit headers tell clients how long to wait and how much quota remains.',
  },
  {
    prompt: 'Why might a security-sensitive limit fail closed while general limits fail open?',
    options: [
      {
        text: 'Allowing unlimited login attempts during an outage could enable brute-force attacks',
        correct: true,
      },
      { text: 'Security limits are cheaper to enforce' },
      { text: 'General limits cannot fail' },
    ],
    explanation: 'The cost of failing open differs by use case.',
  },
])
