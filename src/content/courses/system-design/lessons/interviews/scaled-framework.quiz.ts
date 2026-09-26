import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What does the “E” in SCALED stand for?',
    options: [
      { text: 'Estimate' },
      { text: 'Evolve — deep dives into the hardest parts of the design', correct: true },
      { text: 'Encrypt' },
    ],
    explanation:
      'Capacity estimation is the “C”; “E” is where you evolve the design through deep dives.',
  },
  {
    prompt: 'Which of these are non-functional requirements?',
    options: [
      { text: 'Redirects complete in under 50 ms', correct: true },
      { text: 'Users can create a short link' },
      { text: '99.99% availability', correct: true },
      { text: 'Data must not be lost once acknowledged', correct: true },
    ],
    explanation:
      'Creating a short link is a feature (functional); latency, availability and durability are qualities.',
  },
  {
    prompt: 'What should drive your choice of storage technology?',
    options: [
      { text: 'The access patterns of the data', correct: true },
      { text: 'Which database is most popular this year' },
      { text: 'Always using a relational database' },
    ],
    explanation:
      'How data is read and written — keys, ranges, joins, volume — determines the right store.',
  },
])
