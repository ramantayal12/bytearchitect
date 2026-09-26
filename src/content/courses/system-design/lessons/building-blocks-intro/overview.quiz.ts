import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why are building blocks studied separately from design problems?',
    options: [
      {
        text: 'So they can be reused across designs and explored in depth when needed',
        correct: true,
      },
      { text: 'Because design problems do not use them' },
      { text: 'Because interviews only ask about building blocks' },
    ],
    explanation:
      'Learning each block once lets you apply it quickly and answer deep questions about it.',
  },
  {
    prompt: 'Which building block best fits storing large media files such as videos?',
    options: [
      { text: 'Distributed cache' },
      { text: 'Blob store', correct: true },
      { text: 'Rate limiter' },
    ],
    explanation: 'Blob stores are designed for large, unstructured, mostly immutable objects.',
  },
  {
    prompt: 'Which building blocks support asynchronous processing?',
    options: [
      { text: 'Messaging queue', correct: true },
      { text: 'Pub-sub', correct: true },
      { text: 'Domain name system' },
      { text: 'Task scheduler', correct: true },
    ],
    explanation: 'DNS resolves names; the others decouple or defer work.',
  },
])
