import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why is a LIKE query over a large table unsuitable for search?',
    options: [
      { text: 'It scans every row and provides no relevance ranking', correct: true },
      { text: 'SQL does not support text' },
      { text: 'It returns results too quickly' },
    ],
    explanation: 'Full scans do not scale, and matching alone is not ranking.',
  },
  {
    prompt: 'What is the relationship between the search index and the primary database?',
    options: [
      { text: 'The index is derived from the database and can be rebuilt', correct: true },
      { text: 'The index is the only copy of the data' },
      { text: 'The database is derived from the index' },
    ],
    explanation: 'Search indexes are optimized copies, not the source of truth.',
  },
  {
    prompt: 'Which are typical non-functional requirements for search?',
    options: [
      { text: 'Low query latency', correct: true },
      { text: 'Freshness of newly indexed documents', correct: true },
      { text: 'Strong multi-row transactions' },
    ],
    explanation: 'Search systems rarely need transactional guarantees.',
  },
])
