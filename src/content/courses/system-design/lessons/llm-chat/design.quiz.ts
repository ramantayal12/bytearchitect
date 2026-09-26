import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What does continuous batching do?',
    options: [
      {
        text: 'Adds and removes requests from the running batch at each decoding step',
        correct: true,
      },
      { text: 'Waits until every request in a batch finishes before starting new ones' },
      { text: 'Processes one request per GPU at a time' },
    ],
    explanation: 'GPUs stay busy because slots are refilled as soon as requests finish.',
  },
  {
    prompt: 'Why should a stopped or abandoned generation be cancelled immediately?',
    options: [
      { text: 'It frees an expensive GPU slot for other requests', correct: true },
      { text: 'It deletes the conversation' },
      { text: 'It improves the model’s accuracy' },
    ],
    explanation: 'Wasted decode steps directly cost GPU capacity.',
  },
  {
    prompt: 'Which practices improve prefix-cache hit rates?',
    multi: true,
    options: [
      {
        text: 'Keeping the system prompt and earlier turns byte-identical across requests',
        correct: true,
      },
      { text: 'Routing a conversation’s turns to the same inference server', correct: true },
      { text: 'Inserting a random timestamp at the start of every prompt' },
    ],
    explanation: 'Changing the start of the prompt invalidates the cached prefix.',
  },
])
