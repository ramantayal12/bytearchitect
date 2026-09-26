import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Match the workload to its main technique: map tiles are primarily…',
    options: [
      { text: 'A caching and CDN problem', correct: true },
      { text: 'A graph precomputation problem' },
      { text: 'A stream processing problem' },
    ],
    explanation: 'Tiles are static, shared and cacheable.',
  },
  {
    prompt: 'Why are vector tiles addressed by zoom, x and y?',
    options: [
      {
        text: 'Every tile gets a stable URL that caches well at CDN edges and on clients',
        correct: true,
      },
      { text: 'It encrypts the tile contents' },
      { text: 'It lets tiles be computed per user' },
    ],
    explanation: 'Stable, shared URLs maximize cache hit rates.',
  },
  {
    prompt: 'Which statements about the partitioned overlay graph are true?',
    multi: true,
    options: [
      { text: 'Queries search the full graph only near the start and target', correct: true },
      {
        text: 'Shortcut weights can be recomputed when traffic changes without re-partitioning',
        correct: true,
      },
      { text: 'It requires re-partitioning whenever traffic changes' },
      { text: 'It makes queries explore every node in the continent' },
    ],
    explanation: 'Topology-based partitions let weights be customized quickly.',
  },
  {
    prompt: 'What is the role of the ETA model?',
    options: [
      {
        text: 'Correct the graph’s base travel time using learned features such as turns, lights and time of day',
        correct: true,
      },
      { text: 'Choose which tiles the client downloads' },
      { text: 'Replace the road graph entirely' },
    ],
    explanation: 'The model is trained on completed trips to improve accuracy.',
  },
  {
    prompt: 'Which practices help turn noisy location pings into reliable traffic speeds?',
    multi: true,
    options: [
      { text: 'Hidden Markov model map matching', correct: true },
      { text: 'Robust aggregation such as medians over sliding windows', correct: true },
      { text: 'Falling back to historical speeds on sparse edges', correct: true },
      { text: 'Publishing the speed of the first ping on each edge' },
    ],
    explanation: 'Single pings are too noisy and can be outliers.',
  },
  {
    prompt: 'The traffic pipeline stalls for ten minutes. How should routing behave?',
    options: [
      {
        text: 'Keep the last known weights and blend towards historical speeds as data ages',
        correct: true,
      },
      { text: 'Stop returning routes until the pipeline recovers' },
      { text: 'Assume every road is empty' },
    ],
    explanation: 'Graceful degradation keeps the service useful with slightly less accuracy.',
  },
  {
    prompt: 'Why are location pings batched on the device?',
    options: [
      {
        text: 'To reduce request overhead and battery use while keeping updates frequent enough',
        correct: true,
      },
      { text: 'To make pings more precise' },
      { text: 'Because the server can only accept one request per minute' },
    ],
    explanation: 'Batching amortizes connection and radio costs.',
  },
])
