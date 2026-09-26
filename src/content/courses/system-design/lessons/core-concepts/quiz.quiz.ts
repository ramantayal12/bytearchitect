import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Which consistency model makes a replicated system behave as if there were a single copy of the data?',
    options: [
      { text: 'Eventual consistency' },
      { text: 'Causal consistency' },
      { text: 'Linearizability', correct: true },
    ],
    explanation:
      'Linearizable operations appear to take effect instantly at a single point in time.',
  },
  {
    prompt: 'Which of the following make remote calls safer in the presence of partial failure?',
    options: [
      { text: 'Idempotent operations', correct: true },
      { text: 'Timeouts', correct: true },
      { text: 'Assuming the network is reliable' },
      { text: 'Circuit breakers', correct: true },
    ],
    explanation:
      'Assuming a reliable network is one of the classic fallacies of distributed computing.',
  },
  {
    prompt:
      'A social network shows a reply before the message it replies to. Which guarantee would prevent this?',
    options: [
      { text: 'Monotonic writes' },
      { text: 'Causal consistency', correct: true },
      { text: 'Eventual consistency' },
    ],
    explanation: 'Causal consistency orders operations that depend on each other.',
  },
  {
    prompt: 'Which failure model do most practical consensus protocols such as Raft assume?',
    options: [
      { text: 'Byzantine failures' },
      { text: 'Crash failures', correct: true },
      { text: 'No failures' },
    ],
    explanation: 'Raft and Paxos tolerate nodes that stop responding, not nodes that lie.',
  },
  {
    prompt: 'Why are abstractions over the network described as “leaky”?',
    options: [
      { text: 'They expose latency, partial failure and staleness to the caller', correct: true },
      { text: 'They leak memory over time' },
      { text: 'They reveal user data to attackers' },
    ],
    explanation: 'Network realities show through even well-designed interfaces.',
  },
  {
    prompt: 'For which data is eventual consistency usually acceptable?',
    options: [
      { text: 'Number of likes on a post', correct: true },
      { text: 'Remaining seats when booking a flight' },
      { text: 'A bank account balance' },
    ],
    explanation:
      'Brief inaccuracy in like counts is harmless; overselling seats or balances is not.',
  },
  {
    prompt: 'Why is asynchronous messaging often preferred over a long chain of synchronous RPCs?',
    options: [
      { text: 'It reduces coupling of latency and availability between services', correct: true },
      { text: 'It guarantees messages are processed instantly' },
      { text: 'It removes the need for error handling' },
    ],
    explanation: 'In a synchronous chain, one slow or failing service affects the entire request.',
  },
])
