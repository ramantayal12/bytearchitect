import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the risk of batching increments in an API server’s memory?',
    options: [
      { text: 'Buffered increments are lost if the server crashes', correct: true },
      { text: 'Counts become too accurate' },
      { text: 'Reads become impossible' },
    ],
    explanation: 'Durable logs or short windows mitigate the loss.',
  },
  {
    prompt: 'How should a like request prevent double counting when a user taps twice?',
    options: [
      {
        text: 'Insert the (user, post) relationship idempotently and increment only if it was newly created',
        correct: true,
      },
      { text: 'Increment the counter twice and subtract later' },
      { text: 'Ignore the problem' },
    ],
    explanation: 'The relationship table is the source of truth for who liked what.',
  },
  {
    prompt: 'What does a reconciliation job do?',
    options: [
      { text: 'Recomputes totals from the source of truth and corrects drift', correct: true },
      { text: 'Deletes old counters' },
      { text: 'Increases shard counts' },
    ],
    explanation: 'It repairs discrepancies accumulated over time.',
  },
])
