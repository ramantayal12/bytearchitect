import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'How does a short-video app make playback feel instant when the viewer swipes?',
    options: [
      { text: 'The client pre-fetches the first segments of the next few clips', correct: true },
      { text: 'Every clip is encoded at the lowest possible bitrate' },
      { text: 'The server pushes the entire feed as a single file' },
    ],
    explanation: 'The next clips are already buffered before the swipe happens.',
  },
  {
    prompt: 'Why can the feed response itself not be served from a shared cache?',
    options: [
      { text: 'Each viewer’s feed is personalized', correct: true },
      { text: 'Clips are too large to cache' },
      { text: 'CDNs cannot cache JSON responses' },
    ],
    explanation: 'The clips are shared and cacheable; the personalized list of clips is not.',
  },
  {
    prompt: 'Which signals are especially valuable for short-video recommendations?',
    multi: true,
    options: [
      { text: 'Completion rate', correct: true },
      { text: 'Skips within the first second', correct: true },
      { text: 'Re-watches', correct: true },
      { text: 'The file size of the upload' },
    ],
    explanation: 'Fine-grained viewing behavior reveals preference; file size does not.',
  },
])
