import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the main idea behind per-title encoding?',
    options: [
      {
        text: 'Choose bitrates based on each video’s complexity to reach a target visual quality',
        correct: true,
      },
      { text: 'Encode every video at the highest possible bitrate' },
      { text: 'Let viewers choose the codec for each title' },
    ],
    explanation: 'Simple content needs fewer bits for the same perceived quality.',
  },
  {
    prompt: 'Why might a platform encode a video in AV1 only after it becomes popular?',
    options: [
      {
        text: 'AV1 is costly to encode, and the bandwidth saving only pays off for widely watched videos',
        correct: true,
      },
      { text: 'AV1 cannot be used for new uploads' },
      { text: 'Popular videos must use a lower quality codec' },
    ],
    explanation: 'Encoding cost is paid once; bandwidth savings scale with views.',
  },
  {
    prompt: 'What are benefits of placing cache appliances inside ISP networks?',
    multi: true,
    options: [
      { text: 'Lower latency for viewers', correct: true },
      { text: 'Reduced transit costs for both the ISP and the platform', correct: true },
      { text: 'Eliminates the need for an origin store' },
    ],
    explanation:
      'Content is served close to viewers, but it still originates from the platform’s storage.',
  },
])
