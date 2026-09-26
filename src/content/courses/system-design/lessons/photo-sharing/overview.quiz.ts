import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why is each uploaded photo processed into several variants?',
    options: [
      {
        text: 'Thumbnails, feed images and full-screen views need different sizes, and smaller variants load faster',
        correct: true,
      },
      { text: 'To make the original file larger' },
      { text: 'Because CDNs only accept one size' },
    ],
    explanation: 'Serving the right size saves bandwidth and improves load time.',
  },
  {
    prompt: 'Which two earlier designs does photo sharing combine?',
    options: [
      { text: 'A media processing pipeline and a social feed', correct: true },
      { text: 'A rate limiter and a sequencer' },
      { text: 'A web crawler and a typeahead service' },
    ],
    explanation: 'Uploads resemble the video pipeline; viewing resembles the newsfeed.',
  },
  {
    prompt: 'How can uploads feel instant on a mobile network?',
    options: [
      {
        text: 'Show the post immediately in the app while upload and processing finish in the background',
        correct: true,
      },
      { text: 'Block the app until processing completes' },
      { text: 'Upload only the smallest thumbnail' },
    ],
    explanation: 'Optimistic UI hides upload and processing latency.',
  },
])
