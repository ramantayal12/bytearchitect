import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which statement about preparation time is most accurate?',
    options: [
      { text: 'Everyone needs exactly eight weeks' },
      {
        text: 'It depends on starting experience, target level and weekly commitment',
        correct: true,
      },
      { text: 'Experienced engineers need no preparation' },
    ],
    explanation:
      'Timelines vary; even experienced engineers benefit from practicing under time pressure.',
  },
  {
    prompt: 'What is the recommended way to study a design problem in Phase 3?',
    options: [
      { text: 'Read the solution twice, then move on' },
      {
        text: 'Attempt it yourself for 30–40 minutes first, then compare with the lesson',
        correct: true,
      },
      { text: 'Skip problems that look similar to ones you have seen' },
    ],
    explanation: 'Attempting first reveals gaps that passive reading hides.',
  },
  {
    prompt: 'Which are signs that you are ready for interviews?',
    options: [
      { text: 'You can design an unfamiliar system in about 25 minutes', correct: true },
      { text: 'You can explain the trade-offs of every component you draw', correct: true },
      { text: 'You have memorized every lesson word for word' },
      {
        text: 'You handle follow-up questions about failures without losing structure',
        correct: true,
      },
    ],
    explanation: 'Readiness is about reasoning and structure under pressure, not memorization.',
  },
])
