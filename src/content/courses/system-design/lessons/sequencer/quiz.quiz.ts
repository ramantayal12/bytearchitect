import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which ID design is 64-bit, roughly time-ordered and generated without a network call?',
    options: [
      { text: 'Random UUID' },
      { text: 'Snowflake-style time-based ID', correct: true },
      { text: 'Central database auto-increment' },
    ],
    explanation: 'It combines timestamp, worker ID and sequence locally.',
  },
  {
    prompt:
      'A range server hands out blocks of one million IDs. What happens if a generator crashes halfway through its block?',
    options: [
      {
        text: 'The unused IDs are wasted, which is acceptable given the size of the 64-bit space',
        correct: true,
      },
      { text: 'Duplicate IDs are generated' },
      { text: 'The whole system stops' },
    ],
    explanation: 'Skipping IDs is harmless; duplicates are what must be avoided.',
  },
  {
    prompt: 'Which problems can clock skew cause for time-based IDs?',
    options: [
      { text: 'A reply receiving a smaller ID than the message it replies to', correct: true },
      { text: 'Duplicate IDs if a clock moves backwards without protection', correct: true },
      { text: 'IDs exceeding 64 bits' },
    ],
    explanation: 'Skew affects ordering and, without safeguards, uniqueness.',
  },
  {
    prompt: 'How many bits of a Snowflake-style ID typically hold the timestamp?',
    options: [{ text: '12' }, { text: '41', correct: true }, { text: '64' }],
    explanation: '41 bits of milliseconds cover about 69 years.',
  },
  {
    prompt: 'Why are random UUIDs less efficient as database primary keys than time-ordered IDs?',
    options: [
      { text: 'Random inserts scatter across index pages, hurting locality', correct: true },
      { text: 'UUIDs cannot be indexed' },
      { text: 'UUIDs collide frequently' },
    ],
    explanation: 'Time-ordered keys append near the end of the index.',
  },
  {
    prompt:
      'Which clock type keeps timestamps close to wall-clock time while preserving causality in 64 bits?',
    options: [
      { text: 'Vector clock' },
      { text: 'Hybrid logical clock', correct: true },
      { text: 'Lamport clock' },
    ],
    explanation: 'HLCs combine physical time with a logical counter.',
  },
])
