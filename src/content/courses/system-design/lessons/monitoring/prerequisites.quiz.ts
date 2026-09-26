import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which properties make time-series data suited to specialized databases?',
    options: [
      { text: 'Write-heavy and append-only', correct: true },
      { text: 'Highly compressible consecutive values', correct: true },
      { text: 'Frequent in-place updates of old points' },
    ],
    explanation: 'Old points are rarely updated; the workload is dominated by appends.',
  },
  {
    prompt: 'What is downsampling?',
    options: [
      { text: 'Aggregating old data into coarser intervals to reduce storage', correct: true },
      { text: 'Deleting all data older than a day' },
      { text: 'Sampling only some servers' },
    ],
    explanation: 'Rollups keep long-term trends at a fraction of the storage.',
  },
  {
    prompt: 'Which collection model suits a short-lived batch job best?',
    options: [{ text: 'Pull' }, { text: 'Push', correct: true }, { text: 'Neither' }],
    explanation: 'The job may finish before a scraper ever polls it.',
  },
])
