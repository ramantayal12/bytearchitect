import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What are the benefits of splitting files into content-hashed chunks?',
    multi: true,
    options: [
      { text: 'Only changed chunks are uploaded after an edit', correct: true },
      { text: 'Identical chunks are stored once', correct: true },
      { text: 'Interrupted transfers resume from the last complete chunk', correct: true },
      { text: 'Files no longer need metadata' },
    ],
    explanation: 'Chunk lists still need a metadata service to describe files.',
  },
  {
    prompt:
      'Two devices edit the same file offline and both try to commit. What happens to the second commit?',
    options: [
      { text: 'It fails the version check, and the client saves a conflicted copy', correct: true },
      { text: 'It silently overwrites the first edit' },
      { text: 'Both edits are merged line by line automatically' },
    ],
    explanation: 'Optimistic concurrency detects the conflict; no work is lost.',
  },
  {
    prompt:
      'Why does content-defined chunking help when bytes are inserted near the start of a file?',
    options: [
      {
        text: 'Boundaries follow content, so most later chunks keep the same hashes',
        correct: true,
      },
      { text: 'It makes chunks larger' },
      { text: 'It encrypts the file' },
    ],
    explanation: 'Fixed offsets would shift every subsequent chunk.',
  },
])
