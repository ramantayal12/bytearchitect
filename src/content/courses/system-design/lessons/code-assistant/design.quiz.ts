import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What does fill-in-the-middle prompting give the completion model?',
    options: [
      {
        text: 'The code both before and after the cursor, so the completion fits between them',
        correct: true,
      },
      { text: 'The entire repository in one prompt' },
      { text: 'Only the file name' },
    ],
    explanation: 'Knowing what follows the cursor makes completions fit correctly.',
  },
  {
    prompt: 'Why does the plugin cancel in-flight requests when the developer keeps typing?',
    options: [
      {
        text: 'The suggestion is now stale, and cancelling frees server GPU capacity',
        correct: true,
      },
      { text: 'To prevent the developer from typing' },
      { text: 'Because each request can only be sent once per day' },
    ],
    explanation: 'Stale work wastes latency budget and compute.',
  },
  {
    prompt: 'Where is the exclusion of sensitive files enforced?',
    options: [
      { text: 'In the plugin, before anything leaves the developer’s machine', correct: true },
      { text: 'Only after the model generates a response' },
      { text: 'Nowhere, all files are sent' },
    ],
    explanation: 'Client-side enforcement ensures excluded content is never transmitted.',
  },
])
