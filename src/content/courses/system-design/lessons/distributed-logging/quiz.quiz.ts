import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What should a log agent do if the logging backend is temporarily slow?',
    options: [
      { text: 'Buffer logs on local disk and send them later', correct: true },
      { text: 'Block the application until the backend recovers' },
      { text: 'Discard all logs immediately' },
    ],
    explanation: 'Buffering protects both the application and the logs.',
  },
  {
    prompt: 'Which field is most useful for correlating logs from one request across services?',
    options: [{ text: 'Trace ID', correct: true }, { text: 'Log level' }, { text: 'Host name' }],
    explanation: 'The trace ID is shared by every log line for the request.',
  },
  {
    prompt: 'Where should logs older than 30 days typically be stored?',
    options: [
      { text: 'Compressed in a blob store (cold tier)', correct: true },
      { text: 'In the hot search index forever' },
      { text: 'Only on the original hosts' },
    ],
    explanation: 'Cold storage is far cheaper for rarely searched data.',
  },
  {
    prompt: 'Which statements about log levels are true?',
    options: [
      { text: 'Production usually logs INFO and above', correct: true },
      { text: 'DEBUG can be enabled selectively during investigations', correct: true },
      { text: 'ERROR should be used for normal successful requests' },
    ],
    explanation: 'Successful requests belong at INFO or DEBUG.',
  },
  {
    prompt:
      'A bug causes a service to log the same error 100,000 times per second. What protects the pipeline?',
    options: [
      { text: 'Per-service rate limiting and sampling of log volume', correct: true },
      { text: 'Increasing retention' },
      { text: 'Disabling the buffer' },
    ],
    explanation: 'Limits prevent one service from overwhelming shared infrastructure.',
  },
  {
    prompt: 'Why redact sensitive data at the source?',
    options: [
      {
        text: 'Once logged, it spreads to indexes, backups and archives and is hard to purge',
        correct: true,
      },
      { text: 'Sensitive data makes logs larger' },
      { text: 'Search engines cannot index it' },
    ],
    explanation:
      'Preventing sensitive data from entering logs is far easier than removing it later.',
  },
])
