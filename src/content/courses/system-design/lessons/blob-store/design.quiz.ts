import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why is blob metadata committed only after all chunks are durably written?',
    options: [
      {
        text: 'So readers never see a partially written blob, and failed uploads leave only garbage to collect',
        correct: true,
      },
      { text: 'Because metadata is larger than data' },
      { text: 'To make uploads faster' },
    ],
    explanation: 'The metadata commit is the atomic point at which the blob becomes visible.',
  },
  {
    prompt: 'What does the chunk map record?',
    options: [
      { text: 'Which chunks make up a blob and which data nodes store them', correct: true },
      { text: 'The access log of each blob' },
      { text: 'The CDN cache status' },
    ],
    explanation: 'Front ends use it to read and reassemble blobs.',
  },
  {
    prompt: 'How are deletes implemented efficiently?',
    options: [
      {
        text: 'Logically in metadata, with asynchronous garbage collection of chunks',
        correct: true,
      },
      { text: 'By synchronously erasing every chunk before responding' },
      { text: 'By overwriting chunks with zeros' },
    ],
    explanation: 'Logical deletion keeps the request fast.',
  },
])
