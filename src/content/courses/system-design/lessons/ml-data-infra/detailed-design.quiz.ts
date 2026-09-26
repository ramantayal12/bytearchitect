import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'A label is at 14:03. Feature values exist at 13:50, 14:01 and 14:10. Which should the as-of join use?',
    options: [{ text: '13:50' }, { text: '14:01', correct: true }, { text: '14:10' }],
    explanation: 'Use the latest value at or before the label time; 14:10 is in the future.',
  },
  {
    prompt: 'Why do streaming features use event time rather than processing time?',
    options: [
      {
        text: 'So late-arriving events are counted in the window where they actually occurred',
        correct: true,
      },
      { text: 'Processing time cannot be measured' },
      { text: 'Event time makes GPUs faster' },
    ],
    explanation: 'Event-time windows produce correct, reproducible aggregates.',
  },
  {
    prompt: 'Which techniques keep training accelerators fed with data?',
    multi: true,
    options: [
      { text: 'Large sharded files read in parallel', correct: true },
      { text: 'Prefetching batches ahead of the GPUs', correct: true },
      { text: 'Tokenizing text corpora in advance', correct: true },
      { text: 'Querying the production database for each batch' },
    ],
    explanation: 'Production databases are neither fast nor appropriate for training reads.',
  },
])
