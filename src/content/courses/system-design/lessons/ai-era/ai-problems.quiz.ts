import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which inference phase mostly determines time to first token?',
    options: [
      { text: 'Prefill, which processes the whole prompt', correct: true },
      { text: 'Decode, which generates tokens one at a time' },
      { text: 'Tokenization of the output' },
    ],
    explanation: 'The first token appears only after the prompt is processed.',
  },
  {
    prompt: 'What does retrieval-augmented generation do?',
    options: [
      {
        text: 'Retrieves relevant documents and includes them in the prompt so answers are grounded',
        correct: true,
      },
      { text: 'Retrains the model for every question' },
      { text: 'Caches every answer permanently' },
    ],
    explanation: 'RAG supplies current, specific knowledge at query time.',
  },
  {
    prompt:
      'A service needs 150,000 output tokens per second at peak, and one GPU server produces 3,000 tokens per second. About how many servers are needed before redundancy?',
    options: [{ text: '5' }, { text: '50', correct: true }, { text: '500' }],
    explanation: '150,000 ÷ 3,000 = 50 servers.',
  },
])
