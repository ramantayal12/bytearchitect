import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Which technique lets the key-value store add nodes while moving only a small fraction of keys?',
    options: [
      { text: 'Modulo hashing' },
      { text: 'Consistent hashing', correct: true },
      { text: 'Range partitioning by insertion time' },
    ],
    explanation: 'Consistent hashing moves about 1/N of keys when a node joins.',
  },
  {
    prompt: 'With N = 5, which settings guarantee strict-quorum overlap between reads and writes?',
    options: [
      { text: 'R = 3, W = 3', correct: true },
      { text: 'R = 2, W = 2' },
      { text: 'R = 1, W = 5', correct: true },
      { text: 'R = 2, W = 3' },
    ],
    explanation: 'Overlap requires R + W > N, so R + W must be at least 6.',
  },
  {
    prompt: 'Two versions of a shopping cart are concurrent. What is a reasonable merge strategy?',
    options: [
      { text: 'Take the union of items from both versions', correct: true },
      { text: 'Delete both versions' },
      { text: 'Keep the version from the node with the lowest ID' },
    ],
    explanation:
      'Union ensures added items are never lost, at the risk of reviving a removed item.',
  },
  {
    prompt: 'Which mechanism handles permanent replica divergence in the background?',
    options: [
      { text: 'Hinted handoff' },
      { text: 'Merkle-tree anti-entropy', correct: true },
      { text: 'Load balancing' },
    ],
    explanation: 'Anti-entropy compares and repairs replicas continuously.',
  },
  {
    prompt: 'What is a trade-off of sloppy quorums?',
    options: [
      {
        text: 'Higher availability, but reads may not see the latest write even if R + W > N',
        correct: true,
      },
      { text: 'Lower availability, but stronger consistency' },
      { text: 'They prevent all conflicts' },
    ],
    explanation: 'Writes may land on nodes outside the read set.',
  },
  {
    prompt: 'Why are virtual nodes useful when machines have different capacities?',
    options: [
      {
        text: 'More powerful machines can be assigned more virtual nodes and therefore more data',
        correct: true,
      },
      { text: 'Virtual nodes run on separate hardware' },
      { text: 'They make every machine store the same amount of data' },
    ],
    explanation: 'The number of vnodes controls each machine’s share of the key space.',
  },
  {
    prompt: 'What does a vector clock record?',
    options: [
      {
        text: 'A counter per node that coordinated updates to a version, capturing causality',
        correct: true,
      },
      { text: 'The wall-clock time of each write' },
      { text: 'The number of reads of a key' },
    ],
    explanation: 'Comparing vector clocks reveals whether versions are ordered or concurrent.',
  },
])
