import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the interviewer primarily evaluating in a system design interview?',
    options: [
      { text: 'Whether you produce the one correct architecture' },
      {
        text: 'How you clarify, structure, reason about trade-offs and communicate',
        correct: true,
      },
      { text: 'How quickly you can write production-ready code' },
    ],
    explanation:
      'There is no single correct answer; the process and reasoning are what is assessed.',
  },
  {
    prompt: 'Which activities make up an effective preparation plan?',
    options: [
      { text: 'Learning the building blocks', correct: true },
      { text: 'Practicing a variety of complete designs', correct: true },
      { text: 'Rehearsing designs out loud within a time limit', correct: true },
      { text: 'Memorizing one reference design and reusing it for every question' },
    ],
    explanation:
      'Different problems need different patterns; a memorized template does not transfer.',
  },
  {
    prompt: 'A candidate spends 25 minutes gathering requirements. What is the main risk?',
    options: [
      { text: 'The interviewer will think requirements are unimportant' },
      {
        text: 'They will run out of time before showing high-level design and depth',
        correct: true,
      },
      { text: 'There is no risk; more requirements are always better' },
    ],
    explanation:
      'Time management is part of the evaluation. Requirements should typically take 5–10 minutes.',
  },
])
