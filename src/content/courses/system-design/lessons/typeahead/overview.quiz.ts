import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why does a typeahead service receive more requests than the search engine itself?',
    options: [
      {
        text: 'A request can be sent for each keystroke rather than once per search',
        correct: true,
      },
      { text: 'Typeahead requests are retried ten times' },
      { text: 'Search engines cache all queries' },
    ],
    explanation: 'Typing a query of many characters can produce many suggestion requests.',
  },
  {
    prompt: 'What is the key architectural split in a typeahead system?',
    options: [
      {
        text: 'A read-only in-memory serving path and an offline pipeline that builds its data',
        correct: true,
      },
      { text: 'A write-heavy database and a CDN' },
      { text: 'A message queue and a blob store' },
    ],
    explanation: 'Heavy computation happens offline so serving is fast.',
  },
  {
    prompt: 'Roughly how quickly must suggestions appear to feel responsive?',
    options: [
      { text: 'Within about 100 milliseconds end to end', correct: true },
      { text: 'Within about 5 seconds' },
      { text: 'Within about a minute' },
    ],
    explanation: 'Suggestions must keep pace with typing.',
  },
])
