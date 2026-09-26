import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which resource typically dominates the operating cost of a large video platform?',
    options: [
      { text: 'Egress bandwidth for delivering video', correct: true },
      { text: 'CPU for serving metadata requests' },
      { text: 'Database licenses' },
    ],
    explanation: 'Every view ships many megabytes, so bytes delivered dominate the bill.',
  },
  {
    prompt: 'Why should the upload path and the watch path be designed separately?',
    options: [
      { text: 'They have different frequency, latency and scaling characteristics', correct: true },
      { text: 'They must run in different programming languages' },
      { text: 'Uploads must always be served by the CDN' },
    ],
    explanation:
      'Uploads are rare, heavy and tolerant of delay; views are frequent and latency-sensitive.',
  },
  {
    prompt: 'Which properties of video traffic make the problem hard?',
    multi: true,
    options: [
      { text: 'Very large files', correct: true },
      { text: 'Heterogeneous client devices and networks', correct: true },
      { text: 'Skewed popularity with sudden viral spikes', correct: true },
      { text: 'Writes vastly outnumber reads' },
    ],
    explanation: 'Reads (views) vastly outnumber writes (uploads), not the other way around.',
  },
])
