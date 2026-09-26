import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the main goal of system design?',
    options: [
      { text: 'Memorizing reference architectures for popular products' },
      {
        text: 'Choosing and combining components so a system stays fast, correct and affordable as it grows',
        correct: true,
      },
      { text: 'Writing the most efficient algorithm for a single machine' },
      { text: 'Picking the most popular technologies' },
    ],
    explanation:
      'System design focuses on how components fit together and the trade-offs involved as scale, reliability and cost requirements change.',
  },
  {
    prompt: 'Which of these are part of the “building blocks” section of the course?',
    options: [
      { text: 'Load balancers', correct: true },
      { text: 'Distributed caches', correct: true },
      { text: 'Messaging queues', correct: true },
      { text: 'Frontend CSS frameworks' },
    ],
    explanation:
      'Building blocks are reusable infrastructure components; CSS frameworks are outside the scope of this course.',
  },
  {
    prompt: 'What is the most effective way to study a design lesson?',
    options: [
      { text: 'Read it twice before attempting anything' },
      { text: 'Sketch your own solution first, then compare it with the lesson', correct: true },
      { text: 'Skip to the key takeaways' },
    ],
    explanation:
      'Attempting the problem first exposes gaps in your reasoning, which the lesson can then fill.',
  },
])
