import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why store a denormalized score on each answer row?',
    options: [
      { text: 'So answers can be sorted without counting votes on every page view', correct: true },
      { text: 'To prevent users from voting twice' },
      { text: 'Because vote rows cannot be stored in a relational database' },
    ],
    explanation: 'Counting votes per read would be expensive for popular answers.',
  },
  {
    prompt: 'How does the initial design provide read-your-writes consistency with read replicas?',
    options: [
      {
        text: 'It routes an author’s reads to the primary for a short time after they write',
        correct: true,
      },
      { text: 'It disables replication entirely' },
      { text: 'It waits for all replicas to catch up before every read' },
    ],
    explanation:
      'Only the author needs the fresh view, so only their reads bypass lagging replicas.',
  },
  {
    prompt:
      'Which parts of the initial design are likely to become bottlenecks first at large scale?',
    multi: true,
    options: [
      { text: 'The single primary database for writes', correct: true },
      { text: 'Feed computation at request time', correct: true },
      { text: 'The stateless web servers' },
    ],
    explanation: 'Stateless servers scale horizontally; the primary and on-demand feed do not.',
  },
])
