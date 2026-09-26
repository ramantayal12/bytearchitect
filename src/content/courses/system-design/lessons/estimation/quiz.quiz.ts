import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'For quick estimation, how many seconds are in a day?',
    options: [
      { text: 'About 10,000' },
      { text: 'About 100,000', correct: true },
      { text: 'About 1,000,000' },
    ],
    explanation: '86,400 is rounded to 100,000 for easy mental math.',
  },
  {
    prompt:
      'A service receives 50 million writes per day with a 4× peak factor. What is the approximate peak write rate?',
    options: [{ text: '500/s' }, { text: '2,000/s', correct: true }, { text: '20,000/s' }],
    explanation: '5 × 10^7 / 10^5 = 500/s average; × 4 = 2,000/s peak.',
  },
  {
    prompt: 'Which operations are roughly ordered from fastest to slowest?',
    options: [
      { text: 'Memory → SSD read → data-center round trip → HDD seek', correct: true },
      { text: 'HDD seek → memory → SSD read → cross-continent round trip' },
      { text: 'Cross-continent round trip → memory → SSD read → HDD seek' },
    ],
    explanation: '~100 ns, ~100 µs, ~0.5 ms, ~10 ms.',
  },
  {
    prompt: '1 billion records of 1 KB each take roughly how much space?',
    options: [{ text: '1 GB' }, { text: '1 TB', correct: true }, { text: '1 PB' }],
    explanation: '10^9 × 10^3 bytes = 10^12 bytes = 1 TB.',
  },
  {
    prompt: 'A workload has a 250 : 1 read-to-write ratio. Which techniques are most appropriate?',
    options: [
      { text: 'Caching', correct: true },
      { text: 'Read replicas', correct: true },
      { text: 'Optimizing only the write path' },
      { text: 'A CDN for static content', correct: true },
    ],
    explanation: 'Read-heavy workloads benefit most from techniques that offload reads.',
  },
  {
    prompt: 'Why should you design for peak rather than average traffic?',
    options: [
      {
        text: 'Peak traffic can be several times the average, and the system must not fall over then',
        correct: true,
      },
      { text: 'Average traffic is impossible to estimate' },
      { text: 'Interviewers only accept peak numbers' },
    ],
    explanation:
      'Systems sized for the average will be overloaded during daily or event-driven peaks.',
  },
])
