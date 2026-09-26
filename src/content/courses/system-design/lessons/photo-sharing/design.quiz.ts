import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why is a new post held as pending until its media is processed?',
    options: [
      { text: 'So followers never see a post with missing or broken images', correct: true },
      { text: 'Because captions must be approved' },
      { text: 'To delay fan-out by a fixed hour' },
    ],
    explanation: 'Visibility waits for the variants to be ready.',
  },
  {
    prompt: 'How are photos from private accounts protected at the CDN?',
    options: [
      { text: 'Signed, expiring URLs checked at the edge', correct: true },
      { text: 'They are never cached anywhere' },
      { text: 'They are stored in the relational database' },
    ],
    explanation: 'A leaked URL stops working after it expires.',
  },
  {
    prompt: 'Why does the feed response include URLs for several variants?',
    options: [
      {
        text: 'The client picks the best variant for its screen density and network quality',
        correct: true,
      },
      { text: 'The client downloads all variants for every post' },
      { text: 'Variants are needed for search indexing' },
    ],
    explanation: 'Letting the client choose avoids wasting bandwidth.',
  },
])
