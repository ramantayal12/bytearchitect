import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Going from 4 to 5 nodes with modulo hashing moves roughly what share of keys?',
    options: [
      { text: 'About 20 percent' },
      { text: 'About 80 percent', correct: true },
      { text: 'None' },
    ],
    explanation: 'Only keys whose hash gives the same remainder for both N stay put.',
  },
  {
    prompt: 'What problems do virtual nodes solve?',
    multi: true,
    options: [
      { text: 'Uneven key distribution across physical nodes', correct: true },
      { text: 'A failed node’s entire load landing on one successor', correct: true },
      { text: 'Supporting nodes with different capacities', correct: true },
      { text: 'The need to hash keys at all' },
    ],
    explanation: 'Keys are still hashed onto the ring.',
  },
  {
    prompt: 'How are replicas placed on the ring?',
    options: [
      {
        text: 'On the next R distinct physical nodes clockwise, ideally in different failure domains',
        correct: true,
      },
      { text: 'On R random nodes chosen per request' },
      { text: 'All on the same physical node' },
    ],
    explanation: 'Skipping virtual nodes of the same machine keeps replicas independent.',
  },
])
