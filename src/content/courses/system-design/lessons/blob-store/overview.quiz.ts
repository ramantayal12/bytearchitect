import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why are relational databases a poor fit for storing large video files?',
    options: [
      {
        text: 'Large values bloat storage, slow replication and complicate backups',
        correct: true,
      },
      { text: 'Databases cannot store binary data at all' },
      { text: 'Videos require graph traversal' },
    ],
    explanation: 'Databases are optimized for small structured records.',
  },
  {
    prompt: 'In a photo-sharing app, where should the photo bytes and the photo caption be stored?',
    options: [
      { text: 'Bytes in a blob store; caption and blob key in a database', correct: true },
      { text: 'Both in the blob store' },
      { text: 'Both in the relational database' },
    ],
    explanation: 'Metadata is queried and updated; bytes are large and immutable.',
  },
  {
    prompt: 'Which statement about blob names such as u42/2024/beach.jpg is correct?',
    options: [
      { text: 'The namespace is flat; slashes are part of the name', correct: true },
      { text: 'Each slash creates a real directory on disk' },
      { text: 'Names cannot contain slashes' },
    ],
    explanation: 'Prefixes are used for listing and organization, not physical directories.',
  },
])
