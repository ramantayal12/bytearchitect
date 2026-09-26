import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'How should you treat a language model when designing a system around it?',
    options: [
      {
        text: 'As a slow, expensive, occasionally wrong dependency that needs streaming, caching, fallbacks and evaluation',
        correct: true,
      },
      { text: 'As a perfectly reliable database' },
      { text: 'As a replacement for all other components' },
    ],
    explanation: 'Designing around its weaknesses is the core of AI system design.',
  },
  {
    prompt: 'Which topics are strong signals in an AI design interview?',
    multi: true,
    options: [
      { text: 'Token-based cost and capacity estimates', correct: true },
      { text: 'Evaluation sets and regression detection', correct: true },
      { text: 'Guardrails against prompt injection', correct: true },
      { text: 'Avoiding any discussion of latency' },
    ],
    explanation: 'Latency, especially time to first token, is a key requirement.',
  },
  {
    prompt: 'What remains the engineer’s responsibility when using AI coding assistants?',
    options: [
      { text: 'Reviewing and verifying generated code and designs for correctness', correct: true },
      { text: 'Nothing, the assistant is accountable' },
      { text: 'Only formatting the output' },
    ],
    explanation: 'Generated work must be reviewed like any colleague’s contribution.',
  },
])
