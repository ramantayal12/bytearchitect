import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why use change data capture instead of querying production databases for analytics?',
    options: [
      {
        text: 'It streams changes as events without adding analytical load to production databases',
        correct: true,
      },
      { text: 'Production databases cannot be read' },
      { text: 'CDC deletes old data automatically' },
    ],
    explanation: 'CDC decouples analytics from operational systems.',
  },
  {
    prompt: 'What do the offline and online feature stores hold?',
    options: [
      {
        text: 'Offline: full timestamped history for training; online: latest values for low-latency serving',
        correct: true,
      },
      { text: 'Offline: only images; online: only text' },
      { text: 'Both hold identical copies of the latest values only' },
    ],
    explanation: 'Training needs history; serving needs speed.',
  },
  {
    prompt: 'What does an open table format add to files in object storage?',
    options: [
      { text: 'Transactions, schema evolution and snapshots for time travel', correct: true },
      { text: 'GPU acceleration' },
      { text: 'Automatic model training' },
    ],
    explanation: 'Snapshots enable reproducible "as of" queries.',
  },
])
