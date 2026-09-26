import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      '1 billion responses per day average 400 output tokens each. About how many output tokens per second is that on average?',
    options: [{ text: '460,000' }, { text: '4.6 million', correct: true }, { text: '46 million' }],
    explanation: '4 × 10¹¹ ÷ 86,400 ≈ 4.6 × 10⁶ tokens per second.',
  },
  {
    prompt: 'Which resource dominates the cost of an LLM chat service?',
    options: [
      { text: 'GPU compute for inference', correct: true },
      { text: 'Storage for conversation text' },
      { text: 'DNS queries' },
    ],
    explanation: 'Conversation storage is cheap relative to generating tokens.',
  },
  {
    prompt: 'How should the service behave when GPU capacity is short?',
    options: [
      {
        text: 'Prioritize paid users and degrade gracefully for free users, for example with a smaller model or a queue',
        correct: true,
      },
      { text: 'Return errors to all users equally' },
      { text: 'Stop streaming and send responses by email' },
    ],
    explanation: 'Tiered priority and graceful degradation preserve the experience.',
  },
])
