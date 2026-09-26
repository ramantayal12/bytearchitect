import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which components store the actual bytes of blobs?',
    options: [
      { text: 'Metadata service' },
      { text: 'Data nodes', correct: true },
      { text: 'Front-end servers' },
    ],
    explanation: 'Front ends coordinate; the metadata service stores maps and policies.',
  },
  {
    prompt: 'An upload fails after writing half of its chunks. What happens to those chunks?',
    options: [
      {
        text: 'No metadata references them, so garbage collection removes them later',
        correct: true,
      },
      { text: 'Readers see half the file' },
      { text: 'They are kept forever' },
    ],
    explanation: 'Committing metadata last keeps partial uploads invisible.',
  },
  {
    prompt: 'Which statements about erasure coding are true?',
    options: [
      { text: 'It uses less storage than replication for similar fault tolerance', correct: true },
      { text: 'Reconstruction requires reading multiple fragments and CPU work', correct: true },
      { text: 'It is always faster than replication for small reads' },
    ],
    explanation: 'Small reads may touch several servers, making erasure coding slower for them.',
  },
  {
    prompt: 'Which pattern should be used for media in a social app?',
    options: [
      { text: 'Blob store for bytes, database for metadata, CDN for delivery', correct: true },
      { text: 'Store images as base64 strings in the user table' },
      { text: 'Keep media only in the application servers’ memory' },
    ],
    explanation: 'This division of labor is standard for media-heavy designs.',
  },
  {
    prompt: 'What does background scrubbing do?',
    options: [
      {
        text: 'Reads stored data and verifies checksums to detect silent corruption',
        correct: true,
      },
      { text: 'Deletes old blobs automatically' },
      { text: 'Compresses blobs' },
    ],
    explanation: 'Scrubbing finds problems before users encounter them.',
  },
  {
    prompt:
      'Which storage tier is appropriate for compliance archives accessed a few times per decade?',
    options: [{ text: 'Hot' }, { text: 'Archive', correct: true }, { text: 'In-memory cache' }],
    explanation: 'Archive tiers minimize cost for rarely accessed data.',
  },
])
