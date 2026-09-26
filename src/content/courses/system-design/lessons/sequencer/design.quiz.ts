import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'In a Snowflake-style layout with a 12-bit sequence, how many IDs can one worker generate per millisecond?',
    options: [{ text: '1,024' }, { text: '4,096', correct: true }, { text: '65,536' }],
    explanation: '2^12 = 4,096.',
  },
  {
    prompt: 'What is the main risk of time-based ID generation?',
    options: [
      { text: 'A clock moving backwards can produce duplicate IDs', correct: true },
      { text: 'IDs exceed 64 bits' },
      { text: 'IDs are never sortable' },
    ],
    explanation: 'Generators must detect clock rollback and wait before generating again.',
  },
  {
    prompt: 'Which designs avoid a network call on the hot path of generating each ID?',
    options: [
      { text: 'UUIDs', correct: true },
      { text: 'Time-based composite IDs', correct: true },
      { text: 'Range allocation after obtaining a block', correct: true },
      { text: 'A single central database auto-increment per ID' },
    ],
    explanation: 'Only the central database approach requires a round trip for every ID.',
  },
])
