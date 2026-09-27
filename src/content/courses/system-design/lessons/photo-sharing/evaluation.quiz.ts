import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which costs dominate a photo-sharing service?',
    options: [
      { text: 'CDN egress for image views', correct: true },
      { text: 'Storage for originals and variants', correct: true },
      { text: 'CPU for serving the follow API' },
      { text: 'Bandwidth for sending captions' },
    ],
    explanation:
      'Petabytes of image views per day and hundreds of terabytes of new media per day dwarf other costs.',
  },
  {
    prompt: 'Why are posts held as pending until their image variants exist?',
    options: [
      { text: 'So followers never see a broken or missing image', correct: true },
      { text: 'Because the blob store cannot accept writes until then' },
      { text: 'To reduce the number of posts per second' },
    ],
    explanation: 'A short visibility delay buys correctness for every follower.',
  },
  {
    prompt: 'What is a drawback of generating image variants on demand at the edge?',
    options: [
      {
        text: 'The first request for each variant is slower, and viral posts can trigger many resizes without coalescing',
        correct: true,
      },
      { text: 'It requires storing more variants than precomputation' },
      { text: 'It makes adding new image sizes harder' },
    ],
    explanation:
      'On-demand generation saves storage but moves work and latency onto first requests.',
  },
])
