import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why might a URL shortener that offers analytics prefer a 302 redirect over a 301?',
    options: [
      {
        text: 'Browsers do not cache a 302 permanently, so every click reaches the service and is counted',
        correct: true,
      },
      { text: 'A 302 is faster for browsers' },
      { text: 'A 301 cannot include a Location header' },
    ],
    explanation: 'A cached 301 hides repeat clicks from the service.',
  },
  {
    prompt: 'What is the main drawback of using the first 7 characters of a URL hash as the key?',
    options: [
      {
        text: 'Different URLs can collide, requiring a check and retry on every insert',
        correct: true,
      },
      { text: 'Hashes cannot be encoded in base 62' },
      { text: 'The same URL gets a different key each time' },
    ],
    explanation: 'Truncated hashes collide, and collisions grow as the table fills.',
  },
  {
    prompt: 'How can counter-based keys be made unpredictable?',
    options: [
      {
        text: 'Apply a reversible scrambling function to the ID before base-62 encoding',
        correct: true,
      },
      { text: 'Use a shorter key' },
      { text: 'Start the counter at a random number and increment by one' },
    ],
    explanation: 'A keyed permutation keeps uniqueness while hiding the sequence.',
  },
])
