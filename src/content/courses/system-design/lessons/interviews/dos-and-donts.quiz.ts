import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which clarifying question is MOST useful at the start of a design interview?',
    options: [
      { text: 'What programming language should the servers use?' },
      { text: 'Is the system read-heavy or write-heavy?', correct: true },
      { text: 'What color should the primary button be?' },
    ],
    explanation:
      'Read/write ratio directly shapes decisions such as caching, replication and storage choices.',
  },
  {
    prompt: 'Why is it better to start with a simple design and evolve it?',
    options: [
      { text: 'It shows you understand why each component is needed', correct: true },
      { text: 'Interviewers only want single-server designs' },
      { text: 'Complex designs are always wrong' },
    ],
    explanation:
      'Evolving a design demonstrates reasoning; jumping to a complex architecture can look like recitation.',
  },
  {
    prompt:
      'The interviewer asks, “What happens if this server goes down?” What is the best response?',
    options: [
      { text: 'Explain that servers rarely fail in practice' },
      {
        text: 'Treat it as a hint, identify the single point of failure and address it',
        correct: true,
      },
      { text: 'Move on to another part of the design' },
    ],
    explanation: 'Interviewer questions usually point at weaknesses worth addressing.',
  },
  {
    prompt: 'Which behaviors tend to hurt a candidate’s evaluation?',
    options: [
      { text: 'Naming a technology without being able to explain what it provides', correct: true },
      { text: 'Designing the database schema before agreeing on features', correct: true },
      { text: 'Signposting what you plan to discuss next' },
      { text: 'Going silent when stuck', correct: true },
    ],
    explanation:
      'Signposting helps; the other behaviors signal shallow understanding or poor prioritization.',
  },
])
