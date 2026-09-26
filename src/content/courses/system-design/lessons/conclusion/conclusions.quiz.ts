import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the purpose of back-of-the-envelope estimates?',
    options: [
      {
        text: 'To find the right order of magnitude so design decisions follow from numbers',
        correct: true,
      },
      { text: 'To produce exact budgets for finance teams' },
      { text: 'To replace requirements gathering' },
    ],
    explanation: 'Approximate numbers are enough to choose between designs.',
  },
  {
    prompt: 'Which recurring design move appeared across many chapters?',
    options: [
      {
        text: 'Separating flows with different characteristics, such as reads and writes or online and offline paths',
        correct: true,
      },
      { text: 'Putting every component on one server' },
      { text: 'Avoiding caches entirely' },
    ],
    explanation: 'Different flows deserve different infrastructure.',
  },
  {
    prompt: 'Which aspects of real systems are often simplified in interviews?',
    multi: true,
    options: [
      { text: 'Migration from old designs to new ones', correct: true },
      { text: 'Organizational and ownership boundaries', correct: true },
      { text: 'Cost constraints', correct: true },
      { text: 'The existence of requirements' },
    ],
    explanation: 'Requirements are central in both interviews and real systems.',
  },
])
