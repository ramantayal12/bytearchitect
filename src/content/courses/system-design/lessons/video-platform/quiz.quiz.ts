import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which stores fit the data of a video platform?',
    multi: true,
    options: [
      { text: 'Blob store for raw uploads and encoded segments', correct: true },
      { text: 'Sharded relational database for video metadata', correct: true },
      { text: 'Wide-column store for comments, likes and view events', correct: true },
      { text: 'Relational database rows for storing the video bytes' },
    ],
    explanation:
      'Video bytes belong in a blob store; structured metadata and high-volume events fit other stores.',
  },
  {
    prompt: 'Why are uploads chunked and resumable?',
    options: [
      {
        text: 'Large files over unreliable networks often fail part-way, and only the failed chunk should be retried',
        correct: true,
      },
      { text: 'Chunking replaces the need for encoding' },
      { text: 'It allows the CDN to cache uploads' },
    ],
    explanation: 'Restarting a multi-gigabyte upload from scratch would frustrate creators.',
  },
  {
    prompt: 'What is a streaming manifest?',
    options: [
      {
        text: 'A file listing available renditions and their segments, used by the player to choose what to download',
        correct: true,
      },
      { text: 'A database table of all videos in a channel' },
      { text: 'The raw upload before encoding' },
    ],
    explanation: 'HLS and DASH manifests drive adaptive bitrate playback.',
  },
  {
    prompt: 'Which statements about the encoding pipeline are true?',
    multi: true,
    options: [
      { text: 'It runs asynchronously, fed by a durable queue', correct: true },
      { text: 'It encodes each video into a ladder of resolutions and codecs', correct: true },
      { text: 'It must finish before the creator’s upload request returns' },
    ],
    explanation: 'The upload is acknowledged once stored; encoding happens afterwards.',
  },
  {
    prompt: 'Which technique best protects the origin from many cache misses for long-tail videos?',
    options: [
      { text: 'A tiered CDN with regional mid-tier caches', correct: true },
      { text: 'Disabling caching for unpopular videos' },
      { text: 'Serving every request from the origin' },
    ],
    explanation: 'Mid-tier caches collapse misses from many edges into a single origin fetch.',
  },
  {
    prompt:
      'An interviewer asks why like counts may be briefly stale. What is the best justification?',
    options: [
      {
        text: 'No decision depends on the exact count, and eventual consistency lets counts be served from a cache cheaply',
        correct: true,
      },
      { text: 'Databases cannot store counts accurately' },
      { text: 'Strong consistency is impossible in distributed systems' },
    ],
    explanation:
      'Tie each trade-off to the product: exactness here has little value and high cost.',
  },
  {
    prompt: 'What distinguishes a short-video app from a long-form video platform?',
    options: [
      {
        text: 'The personalized recommendation feed and instant playback on swipe are the core challenges',
        correct: true,
      },
      { text: 'Short clips require a much larger encoding ladder' },
      { text: 'Short-video apps do not need a CDN' },
    ],
    explanation: 'Delivery is similar; discovery and pre-fetching change.',
  },
])
