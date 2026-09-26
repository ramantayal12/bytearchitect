import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which record type maps a name to an IPv6 address?',
    options: [{ text: 'A' }, { text: 'AAAA', correct: true }, { text: 'CNAME' }, { text: 'MX' }],
    explanation: 'A records hold IPv4 addresses; AAAA records hold IPv6 addresses.',
  },
  {
    prompt: 'What does the .com TLD server need to know to answer queries for www.example.com?',
    options: [
      { text: 'The IP address of www.example.com' },
      { text: 'Which name servers are authoritative for example.com', correct: true },
      { text: 'Every subdomain under example.com' },
    ],
    explanation:
      'Each level delegates authority; the TLD only refers resolvers to the domain’s authoritative servers.',
  },
  {
    prompt: 'Why would a single central DNS server be a poor design?',
    options: [
      { text: 'It would be a single point of failure', correct: true },
      { text: 'It could not scale to the Internet’s query volume', correct: true },
      { text: 'It would add latency for users far away from it', correct: true },
      { text: 'It would make DNS records impossible to cache' },
    ],
    explanation:
      'Caching would still be possible, but scale, availability and latency would all suffer.',
  },
])
