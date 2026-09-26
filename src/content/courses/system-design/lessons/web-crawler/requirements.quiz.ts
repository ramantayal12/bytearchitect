import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the URL frontier?',
    options: [
      { text: 'The data structure holding URLs waiting to be crawled', correct: true },
      { text: 'The storage for fetched HTML' },
      { text: 'The list of blocked websites' },
    ],
    explanation: 'The frontier decides what to crawl next.',
  },
  {
    prompt: 'Why is fetching pages considered I/O-bound?',
    options: [
      {
        text: 'Most of the time is spent waiting on the network, so many fetches can be in flight per machine',
        correct: true,
      },
      { text: 'Parsing HTML uses all CPU cores' },
      { text: 'Pages are read from local disk' },
    ],
    explanation: 'Asynchronous I/O keeps hundreds or thousands of requests in flight.',
  },
  {
    prompt: 'Why do large crawlers run their own caching DNS resolvers?',
    options: [
      {
        text: 'Resolving millions of hostnames through standard resolvers becomes a bottleneck',
        correct: true,
      },
      { text: 'DNS is required to parse HTML' },
      { text: 'Websites block public DNS servers' },
    ],
    explanation: 'Caching and asynchronous resolution avoid DNS latency dominating fetches.',
  },
])
