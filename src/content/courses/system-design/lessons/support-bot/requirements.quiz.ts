import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why is grounding especially important for a customer support bot?',
    options: [
      {
        text: 'Invented policies, prices or legal terms can mislead customers and create liability',
        correct: true,
      },
      { text: 'Grounding makes responses longer' },
      { text: 'Support bots do not need accurate answers' },
    ],
    explanation: 'Answers must come from the company’s own content.',
  },
  {
    prompt: 'In this workload, which token type dominates cost?',
    options: [
      { text: 'Input tokens from retrieved context and history', correct: true },
      { text: 'Output tokens' },
      { text: 'Neither, tokens are free' },
    ],
    explanation: 'About 3,000 input tokens versus 200 output tokens per answer.',
  },
  {
    prompt: 'What must always remain available even if the bot fails?',
    options: [
      { text: 'A path for customers to reach human agents', correct: true },
      { text: 'The analytics dashboard' },
      { text: 'Embedding generation' },
    ],
    explanation: 'Customers must never be stranded without help.',
  },
])
