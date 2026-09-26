import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What does an inverted index map?',
    options: [
      { text: 'Each term to the documents that contain it', correct: true },
      { text: 'Each document to its terms' },
      { text: 'Each user to their queries' },
    ],
    explanation: 'The forward index maps documents to terms; the inverted index flips it.',
  },
  {
    prompt: 'Which steps are part of text analysis?',
    options: [
      { text: 'Tokenization', correct: true },
      { text: 'Lowercasing and normalization', correct: true },
      { text: 'Stemming', correct: true },
      { text: 'Replicating shards' },
    ],
    explanation: 'Replication is an infrastructure concern, not text analysis.',
  },
  {
    prompt: 'Why is deep pagination expensive in a scatter-gather system?',
    options: [
      { text: 'Each shard must return many results for the coordinator to merge', correct: true },
      { text: 'Pages are stored on separate disks' },
      { text: 'It requires re-indexing' },
    ],
    explanation: 'Page 500 × 10 results requires ~5,000 candidates from every shard.',
  },
  {
    prompt: 'How are index updates made efficient?',
    options: [
      {
        text: 'New documents go into small immutable segments that are merged in the background',
        correct: true,
      },
      { text: 'The whole index is rewritten for each update' },
      { text: 'Updates are applied in place to postings lists immediately' },
    ],
    explanation: 'Segment-based indexing avoids expensive in-place modification.',
  },
  {
    prompt: 'What is the purpose of separating indexer nodes from searcher nodes?',
    options: [
      { text: 'Heavy indexing work does not degrade query latency', correct: true },
      { text: 'It reduces the number of shards' },
      { text: 'Searchers do not need the index' },
    ],
    explanation: 'Isolation keeps serving latency stable.',
  },
  {
    prompt: 'Which terms receive a higher weight under IDF?',
    options: [
      { text: 'Rare terms', correct: true },
      { text: 'Very common terms such as “the”' },
      { text: 'Terms in URLs only' },
    ],
    explanation: 'Rare terms are more discriminative.',
  },
  {
    prompt: 'A trending query is searched by millions of users. What most reduces load on shards?',
    options: [
      { text: 'A result cache', correct: true },
      { text: 'More stop words' },
      { text: 'Deeper pagination' },
    ],
    explanation: 'Popular queries can be served from cached results.',
  },
])
