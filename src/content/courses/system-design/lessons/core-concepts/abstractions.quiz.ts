import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is a “leaky abstraction”?',
    options: [
      { text: 'An interface that exposes security vulnerabilities' },
      {
        text: 'An abstraction whose underlying details, such as latency or partial failure, show through',
        correct: true,
      },
      { text: 'A component that uses too much memory' },
    ],
    explanation:
      'For example, remote calls look like local calls but can be slow or fail ambiguously.',
  },
  {
    prompt: 'Which are benefits of depending on abstractions rather than specific implementations?',
    options: [
      { text: 'Teams can work on different layers independently', correct: true },
      { text: 'Implementations can be replaced as requirements change', correct: true },
      { text: 'Network calls become as fast as local calls' },
    ],
    explanation: 'Abstractions do not remove physical costs such as network latency.',
  },
  {
    prompt: 'In an interview, at what level of abstraction should you usually start?',
    options: [
      { text: 'The hardware level, describing servers and switches' },
      {
        text: 'The highest level that answers the question, zooming in when requirements demand',
        correct: true,
      },
      { text: 'Always at the protocol level' },
    ],
    explanation: 'Starting high keeps the design clear; details are added where they matter.',
  },
])
