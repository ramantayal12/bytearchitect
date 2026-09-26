import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why shard the Q&A database by question ID?',
    options: [
      { text: 'A question page with its answers can be served from a single shard', correct: true },
      { text: 'It makes queries for all answers by one user a single-shard lookup' },
      { text: 'It removes the need for replicas' },
    ],
    explanation: 'The most common read touches one question and its answers.',
  },
  {
    prompt: 'How does processing votes as events help with a viral answer?',
    options: [
      {
        text: 'Aggregators batch many votes into periodic score updates, removing hot-row contention',
        correct: true,
      },
      { text: 'It rejects most votes during spikes' },
      { text: 'It makes vote counts strongly consistent' },
    ],
    explanation: 'Thousands of row updates per second become a few batched updates.',
  },
  {
    prompt:
      'Why should an answer with 5 of 5 upvotes not automatically outrank one with 480 of 500?',
    options: [
      {
        text: 'Small samples are uncertain, so ranking should apply a confidence adjustment',
        correct: true,
      },
      { text: 'Newer answers should always rank lower' },
      { text: 'Upvote ratios are irrelevant to quality' },
    ],
    explanation: 'Confidence-adjusted scores favor answers with strong evidence of quality.',
  },
])
