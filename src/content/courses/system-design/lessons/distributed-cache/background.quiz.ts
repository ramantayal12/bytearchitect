import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Which write strategy offers the lowest write latency but risks losing data if the cache fails?',
    options: [
      { text: 'Write-through' },
      { text: 'Write-back', correct: true },
      { text: 'Write-around' },
    ],
    explanation:
      'Write-back acknowledges after updating the cache and flushes to the database later.',
  },
  {
    prompt:
      'A popular key expires and thousands of requests simultaneously query the database. What is this called?',
    options: [
      { text: 'Cache penetration' },
      { text: 'Cache stampede', correct: true },
      { text: 'Write amplification' },
    ],
    explanation: 'Request coalescing or early refresh prevents stampedes.',
  },
  {
    prompt: 'Which data structures give an LRU cache O(1) operations?',
    options: [
      { text: 'Hash map plus doubly linked list', correct: true },
      { text: 'Sorted array' },
      { text: 'Binary search tree only' },
    ],
    explanation:
      'The map finds entries; the list tracks recency and allows O(1) moves and removals.',
  },
  {
    prompt:
      'How can repeated requests for non-existent keys be prevented from hitting the database?',
    options: [
      { text: 'Cache negative results briefly', correct: true },
      { text: 'Use a Bloom filter of existing keys', correct: true },
      { text: 'Increase the TTL of existing keys' },
    ],
    explanation: 'Longer TTLs on existing keys do not help with missing keys.',
  },
])
