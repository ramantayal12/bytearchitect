import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why do clients upload video directly to the blob store using a pre-signed URL?',
    options: [
      { text: 'It keeps gigabytes of video traffic off the application servers', correct: true },
      { text: 'It makes the video searchable immediately' },
      { text: 'It removes the need for encoding' },
    ],
    explanation:
      'The application issues a short-lived credential; the heavy bytes bypass the API tier.',
  },
  {
    prompt: 'How does splitting a video into chunks help the encoding pipeline?',
    options: [
      {
        text: 'Many workers can encode chunks in parallel, cutting total processing time',
        correct: true,
      },
      { text: 'It reduces the number of renditions needed' },
      { text: 'It guarantees the video will never fail to encode' },
    ],
    explanation: 'Parallelism turns hours of serial encoding into minutes.',
  },
  {
    prompt: 'What does adaptive bitrate streaming do?',
    options: [
      {
        text: 'The player switches between renditions at segment boundaries based on measured throughput',
        correct: true,
      },
      { text: 'The server re-encodes the video in real time for each viewer' },
      { text: 'The CDN compresses segments further when the network is slow' },
    ],
    explanation: 'Renditions are pre-encoded; the client chooses among them segment by segment.',
  },
])
