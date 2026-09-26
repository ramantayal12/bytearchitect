import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the main benefit of structured logging?',
    options: [
      { text: 'Fields can be indexed, filtered and aggregated precisely', correct: true },
      { text: 'Logs become smaller than free text in all cases' },
      { text: 'Logs no longer need timestamps' },
    ],
    explanation: 'Key-value fields avoid fragile text parsing.',
  },
  {
    prompt: 'How can you retrieve all logs for one user request across ten services?',
    options: [
      {
        text: 'Propagate a trace ID through every call and include it in each log line',
        correct: true,
      },
      { text: 'Search by timestamp only' },
      { text: 'Log everything at DEBUG level' },
    ],
    explanation: 'The trace ID ties log lines together across services.',
  },
  {
    prompt: 'Which practices reduce logging cost?',
    options: [
      { text: 'Sampling high-volume, low-value logs', correct: true },
      { text: 'Tiered retention with cheap archives', correct: true },
      { text: 'Logging every request body at DEBUG level in production' },
    ],
    explanation: 'Verbose logging of everything multiplies cost.',
  },
])
