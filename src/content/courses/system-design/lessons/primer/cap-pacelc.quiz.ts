import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What does the CAP theorem actually force you to choose?',
    options: [
      {
        text: 'Between consistency and availability while a network partition is happening',
        correct: true,
      },
      { text: 'Any two of the three properties at all times' },
      { text: 'Between latency and throughput' },
    ],
    explanation: 'Partitions are unavoidable; the choice applies during them.',
  },
  {
    prompt: 'What does the "ELC" part of PACELC describe?',
    options: [
      {
        text: 'Else, in normal operation, the trade-off between latency and consistency',
        correct: true,
      },
      { text: 'Encryption, logging and caching' },
      { text: 'Eventual leader consensus' },
    ],
    explanation: 'Coordination for consistency costs latency even without failures.',
  },
  {
    prompt: 'Which data should typically use a PC/EC design?',
    options: [
      { text: 'Account balances in a payment ledger', correct: true },
      { text: 'Presence indicators in a chat app' },
      { text: 'Recommendation lists' },
    ],
    explanation: 'Correctness of money outweighs brief unavailability.',
  },
])
