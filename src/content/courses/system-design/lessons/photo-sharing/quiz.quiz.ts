import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What dominates the cost of a photo-sharing service?',
    options: [
      { text: 'Media storage and delivery bandwidth', correct: true },
      { text: 'Metadata database licenses' },
      { text: 'Search index size' },
    ],
    explanation:
      'Hundreds of terabytes per day and terabits per second of delivery dwarf other costs.',
  },
  {
    prompt: 'Which steps belong in the image processing pipeline?',
    multi: true,
    options: [
      { text: 'Stripping location and camera metadata', correct: true },
      { text: 'Resizing into several variants', correct: true },
      { text: 'Encoding in efficient formats with a fallback', correct: true },
      { text: 'Sending the original to every follower' },
    ],
    explanation: 'Followers receive appropriately sized variants through the CDN.',
  },
  {
    prompt: 'Why can image URLs be cached for a very long time?',
    options: [
      { text: 'They are immutable: a changed image gets a new key', correct: true },
      { text: 'Images never need to be deleted' },
      { text: 'CDNs ignore cache headers' },
    ],
    explanation: 'Immutable content never needs invalidation.',
  },
  {
    prompt:
      'A follower is removed from a private account. Their feed inbox still contains one of its post IDs. What prevents them from seeing it?',
    options: [
      { text: 'Permission checks during hydration filter it out', correct: true },
      { text: 'The inbox is deleted and rebuilt immediately' },
      { text: 'Nothing, they will see it' },
    ],
    explanation: 'Read-time checks enforce current permissions.',
  },
  {
    prompt: 'Why store originals in cold storage rather than deleting them?',
    options: [
      { text: 'They allow re-encoding into better formats or new sizes later', correct: true },
      { text: 'Originals are shown in every feed' },
      { text: 'Cold storage is faster than hot storage' },
    ],
    explanation: 'Keeping the source preserves future flexibility at low cost.',
  },
  {
    prompt: 'When is proactively pushing images to CDN edges worthwhile?',
    options: [
      { text: 'For posts from accounts that reliably attract millions of views', correct: true },
      { text: 'For every upload regardless of audience' },
      { text: 'Never, CDNs only support pull' },
    ],
    explanation: 'Pushing pays off when heavy demand is predictable.',
  },
])
