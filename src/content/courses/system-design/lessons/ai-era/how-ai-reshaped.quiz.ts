import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why does exact-match response caching work poorly for LLM applications?',
    options: [
      {
        text: 'Prompts rarely repeat exactly, so prefix and semantic caching are more useful',
        correct: true,
      },
      { text: 'LLM responses cannot be stored' },
      { text: 'Caches cannot hold text' },
    ],
    explanation: 'Reusing shared prefixes and similar questions captures more reuse.',
  },
  {
    prompt: 'Which latency metrics matter most for streamed LLM responses?',
    multi: true,
    options: [
      { text: 'Time to first token', correct: true },
      { text: 'Tokens per second during generation', correct: true },
      { text: 'DNS lookup time only' },
    ],
    explanation: 'Users perceive responsiveness through the first token and generation speed.',
  },
  {
    prompt: 'What is prompt injection?',
    options: [
      {
        text: 'Malicious instructions in input or retrieved content that try to hijack the model’s behavior',
        correct: true,
      },
      { text: 'Adding more GPUs to a cluster' },
      { text: 'Caching the system prompt' },
    ],
    explanation: 'Treat untrusted text as data, not instructions, and apply guardrails.',
  },
])
