import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'A service has 10 million daily active users, each making 20 requests per day. Roughly what is the average request rate?',
    options: [
      { text: 'About 230 per second' },
      { text: 'About 2,300 per second', correct: true },
      { text: 'About 23,000 per second' },
    ],
    explanation: '2 × 10⁸ requests ÷ about 86,400 seconds ≈ 2,300 per second.',
  },
  {
    prompt: 'In the SCALED framework, what happens in the Defend step?',
    options: [
      {
        text: 'Evaluate the design against requirements, trade-offs, bottlenecks and failure scenarios',
        correct: true,
      },
      { text: 'Estimate storage and bandwidth' },
      { text: 'List the API endpoints' },
    ],
    explanation: 'Defend closes the interview by justifying the design.',
  },
  {
    prompt: 'Which statements about consistent hashing are true?',
    multi: true,
    options: [
      { text: 'Adding a node moves only about 1/N of the keys', correct: true },
      { text: 'Virtual nodes improve load balance', correct: true },
      { text: 'Every key moves when a node is added' },
    ],
    explanation: 'Minimal key movement is the point of consistent hashing.',
  },
  {
    prompt:
      'With N = 5 replicas, which setting guarantees that reads see the latest acknowledged write?',
    options: [
      { text: 'W = 3, R = 3', correct: true },
      { text: 'W = 2, R = 2' },
      { text: 'W = 1, R = 3' },
    ],
    explanation: 'W + R must exceed N: 3 + 3 = 6 > 5.',
  },
  {
    prompt:
      'Which caching problem occurs when a popular key expires and thousands of requests hit the database at once?',
    options: [
      { text: 'Cache stampede', correct: true },
      { text: 'Split-brain' },
      { text: 'Clock skew' },
    ],
    explanation: 'Request coalescing or early refresh prevents stampedes.',
  },
  {
    prompt: 'A payment request to a provider times out. What is the correct handling?',
    options: [
      {
        text: 'Treat the outcome as unknown and retry or query status with the same idempotency key',
        correct: true,
      },
      { text: 'Assume failure and retry with a new key' },
      { text: 'Assume success and ship the order' },
    ],
    explanation: 'Timeouts are ambiguous; idempotency keys make retries safe.',
  },
  {
    prompt:
      'For a microblogging service, why are celebrity posts pulled at read time rather than pushed?',
    options: [
      {
        text: 'Pushing to tens of millions of followers per post causes massive write spikes',
        correct: true,
      },
      { text: 'Celebrity posts are never read' },
      { text: 'Pull is always cheaper for every account' },
    ],
    explanation: 'The hybrid approach balances write and read costs.',
  },
  {
    prompt:
      'Which technique keeps a video platform’s playback smooth when a viewer’s bandwidth drops?',
    options: [
      { text: 'Adaptive bitrate streaming with segmented renditions', correct: true },
      { text: 'Re-encoding the video on the server for each viewer' },
      { text: 'Sending the original upload file' },
    ],
    explanation: 'The player switches to a lower rendition at the next segment.',
  },
  {
    prompt: 'Why must a geohash-based nearby search also check the eight neighboring cells?',
    options: [
      {
        text: 'Points close to a cell boundary can lie in adjacent cells with different geohashes',
        correct: true,
      },
      { text: 'Geohash cells overlap' },
      { text: 'Neighbors always contain more businesses' },
    ],
    explanation: 'Neighbor search avoids boundary misses.',
  },
  {
    prompt: 'How does a ride-hailing service prevent assigning one driver to two riders?',
    options: [
      {
        text: 'An atomic compare-and-set reservation with a lease on the driver’s status',
        correct: true,
      },
      { text: 'Eventual consistency on driver status' },
      { text: 'Letting the driver choose after both are assigned' },
    ],
    explanation: 'Only one reservation attempt can succeed.',
  },
  {
    prompt:
      'In a messaging app, what gives users an exactly-once experience over unreliable networks?',
    options: [
      { text: 'At-least-once delivery with deduplication by message ID', correct: true },
      { text: 'At-most-once delivery' },
      { text: 'Disabling retries' },
    ],
    explanation: 'Retries guarantee delivery; IDs remove duplicates.',
  },
  {
    prompt: 'Why store the top-k suggestions at every node of a typeahead trie?',
    options: [
      {
        text: 'Lookups become proportional to the prefix length instead of the subtree size',
        correct: true,
      },
      { text: 'It makes the trie smaller' },
      { text: 'It removes the need for query logs' },
    ],
    explanation: 'Precomputation makes short, popular prefixes fast.',
  },
  {
    prompt: 'Which statements about OT and CRDTs are true?',
    multi: true,
    options: [
      {
        text: 'OT transforms concurrent operations and usually relies on a central server for ordering',
        correct: true,
      },
      { text: 'CRDT operations commute, enabling offline and peer-to-peer merging', correct: true },
      { text: 'Both approaches rely on last-write-wins for the entire document' },
    ],
    explanation: 'Both preserve concurrent edits rather than discarding them.',
  },
  {
    prompt: 'What does the URL frontier of a web crawler balance?',
    options: [
      { text: 'Priority of pages and politeness towards each host', correct: true },
      { text: 'Encryption and compression' },
      { text: 'Reads and writes to the content store' },
    ],
    explanation: 'Front queues prioritize; back queues enforce per-host politeness.',
  },
  {
    prompt:
      'During a network partition, what must a replicated store choose between according to CAP?',
    options: [
      { text: 'Consistency and availability', correct: true },
      { text: 'Latency and throughput' },
      { text: 'Durability and security' },
    ],
    explanation: 'PACELC adds the latency versus consistency trade-off in normal operation.',
  },
  {
    prompt: 'Which practices limit the blast radius of changes and failures?',
    multi: true,
    options: [
      { text: 'Canary deployments and staged rollouts', correct: true },
      { text: 'Cell-based architecture', correct: true },
      { text: 'Feature flags with fast rollback', correct: true },
      { text: 'Deploying to all regions simultaneously' },
    ],
    explanation: 'Simultaneous global changes maximize blast radius.',
  },
  {
    prompt: 'What turned a brief overload into a sustained outage in several real incidents?',
    options: [
      { text: 'Retries without adequate backoff and jitter', correct: true },
      { text: 'Using too many caches' },
      { text: 'Encrypting network traffic' },
    ],
    explanation: 'Uncontrolled retries amplify load on struggling components.',
  },
  {
    prompt: 'In LLM serving, what does continuous batching improve?',
    options: [
      {
        text: 'GPU utilization, by adding and removing requests from the batch at every decoding step',
        correct: true,
      },
      { text: 'The accuracy of the model' },
      { text: 'The size of the context window' },
    ],
    explanation: 'Slots are refilled as soon as requests finish.',
  },
  {
    prompt: 'What does retrieval-augmented generation add to an LLM application?',
    options: [
      {
        text: 'Relevant documents retrieved at query time and included in the prompt for grounded answers',
        correct: true,
      },
      { text: 'Retraining the model on every question' },
      { text: 'A replacement for the model' },
    ],
    explanation: 'RAG grounds answers in current, specific knowledge.',
  },
  {
    prompt: 'In ML data infrastructure, what does point-in-time correctness prevent?',
    options: [
      {
        text: 'Label leakage from using feature values that were not available at prediction time',
        correct: true,
      },
      { text: 'GPU memory exhaustion' },
      { text: 'Network partitions' },
    ],
    explanation: 'As-of joins use only values known at each example’s timestamp.',
  },
])
