import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What are the two main goals the URL frontier balances?',
    options: [
      { text: 'Priority and politeness', correct: true },
      { text: 'Encryption and compression' },
      { text: 'Sharding and replication' },
    ],
    explanation: 'It crawls important pages first without overloading any host.',
  },
  {
    prompt:
      'Approximately how many pages per second must a crawler fetch to crawl 15 billion pages per month?',
    options: [{ text: '580' }, { text: '5,800', correct: true }, { text: '58,000' }],
    explanation: '15 × 10⁹ ÷ 2.6 × 10⁶ seconds ≈ 5,800 pages per second.',
  },
  {
    prompt: 'Why use conditional requests when recrawling?',
    options: [
      {
        text: 'Unchanged pages return a small 304 response instead of the full content',
        correct: true,
      },
      { text: 'They bypass robots.txt' },
      { text: 'They make pages change more often' },
    ],
    explanation: 'If-Modified-Since and ETag make recrawls of unchanged pages cheap.',
  },
  {
    prompt: 'What should a conservative crawler do if a host’s robots.txt returns a server error?',
    options: [
      { text: 'Pause crawling the host until robots.txt can be read', correct: true },
      { text: 'Assume everything is allowed and crawl at full speed' },
      { text: 'Permanently blacklist the host' },
    ],
    explanation: 'Without the rules, the safe assumption is not to crawl.',
  },
  {
    prompt: 'Which statements about deduplication are true?',
    multi: true,
    options: [
      { text: 'URL normalization catches many duplicates before fetching', correct: true },
      { text: 'Content hashes catch identical pages under different URLs', correct: true },
      { text: 'SimHash catches near-duplicate pages', correct: true },
      { text: 'Deduplication is unnecessary because the web has no duplicates' },
    ],
    explanation: 'A large share of the web is duplicate or near-duplicate content.',
  },
  {
    prompt: 'How is a soft 404 detected?',
    options: [
      {
        text: 'Request a random nonexistent URL on the host and compare the response with suspect pages',
        correct: true,
      },
      { text: 'Check whether the status code is 404' },
      { text: 'Look for the word "error" in the URL' },
    ],
    explanation: 'Soft 404s return 200 OK, so the status code alone is misleading.',
  },
])
