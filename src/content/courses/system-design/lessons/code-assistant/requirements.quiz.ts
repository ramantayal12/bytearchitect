import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why is time to first token essentially the entire latency of an inline completion?',
    options: [
      {
        text: 'Completions are short, so almost all the time goes into processing the context prompt',
        correct: true,
      },
      { text: 'Completions are always thousands of tokens long' },
      { text: 'Editors ignore output tokens' },
    ],
    explanation: 'About 1,500 input tokens versus 30 output tokens per completion.',
  },
  {
    prompt: 'Why should completions and chat be treated as separate workloads?',
    options: [
      {
        text: 'Completions need small, very fast models; chat can use larger models with longer context and more latency',
        correct: true,
      },
      { text: 'Chat never uses repository context' },
      { text: 'Completions do not need a model' },
    ],
    explanation: 'Different latency and quality targets call for different designs.',
  },
  {
    prompt: 'Which requirements protect customers’ code?',
    multi: true,
    options: [
      { text: 'Encryption in transit and limited retention', correct: true },
      { text: 'Isolation between organizations', correct: true },
      { text: 'No training on customer code without consent', correct: true },
      { text: 'Sharing snippets across customers to improve suggestions' },
    ],
    explanation: 'Cross-customer sharing would violate isolation and trust.',
  },
])
