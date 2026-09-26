import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'With 77 new links per second and a 100:1 read ratio, about how many redirects per second is that on average?',
    options: [{ text: '770' }, { text: '7,700', correct: true }, { text: '77,000' }],
    explanation: '77 × 100 = 7,700 redirects per second.',
  },
  {
    prompt: 'Which store best fits the short-key to long-URL mapping?',
    options: [
      { text: 'A distributed key-value store partitioned by key', correct: true },
      { text: 'A graph database' },
      { text: 'A full-text search index' },
    ],
    explanation: 'Access is by key only, with no joins or complex queries.',
  },
  {
    prompt: 'Which key-generation approaches avoid collision checks on insert?',
    multi: true,
    options: [
      { text: 'Encoding unique counter IDs from a range allocator', correct: true },
      { text: 'Pre-generated keys handed out in batches', correct: true },
      { text: 'Taking the first 7 characters of an MD5 hash' },
    ],
    explanation:
      'Truncated hashes can collide; counters and pre-generated keys are unique by construction.',
  },
  {
    prompt:
      'How is a custom alias safely created when two users request the same alias simultaneously?',
    options: [
      { text: 'A conditional write that fails if the key already exists', correct: true },
      { text: 'Both writes succeed and the last one wins' },
      { text: 'The alias is assigned randomly to one of them after an hour' },
    ],
    explanation: 'Conditional inserts make the first writer win atomically.',
  },
  {
    prompt: 'Why are click analytics processed asynchronously?',
    options: [
      { text: 'To keep database writes off the latency-sensitive redirect path', correct: true },
      { text: 'Because analytics are not needed' },
      { text: 'Because redirects cannot emit events' },
    ],
    explanation: 'Redirects stay fast while a stream pipeline aggregates clicks.',
  },
  {
    prompt: 'Which measures reduce abuse of a URL shortener?',
    multi: true,
    options: [
      { text: 'Scanning destinations against malware and phishing lists', correct: true },
      { text: 'Rate limiting link creation', correct: true },
      { text: 'Interstitial warnings for suspicious destinations', correct: true },
      { text: 'Making keys shorter and sequential' },
    ],
    explanation: 'Short, sequential keys make enumeration and abuse easier.',
  },
])
