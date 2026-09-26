import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'In a two-layer frontier, what do the back queues enforce?',
    options: [
      {
        text: 'Politeness: each back queue holds URLs for one host, so fetches to that host are spaced out',
        correct: true,
      },
      { text: 'Priority among different sites' },
      { text: 'Content deduplication' },
    ],
    explanation: 'Front queues handle priority; back queues handle per-host politeness.',
  },
  {
    prompt: 'Why is the frontier partitioned by host across crawler nodes?',
    options: [
      {
        text: 'Each host is managed by one node, so politeness decisions are local',
        correct: true,
      },
      { text: 'Hosts must be crawled in alphabetical order' },
      { text: 'It guarantees every page is fetched twice' },
    ],
    explanation: 'Without host ownership, several nodes could hit the same site at once.',
  },
  {
    prompt: 'What is the consequence of a Bloom filter false positive in the URL-seen check?',
    options: [
      {
        text: 'A new URL is wrongly treated as seen and skipped, which is acceptable',
        correct: true,
      },
      { text: 'A URL is crawled infinitely often' },
      { text: 'The crawler crashes' },
    ],
    explanation: 'Bloom filters never give false negatives, so no seen URL is re-added.',
  },
])
