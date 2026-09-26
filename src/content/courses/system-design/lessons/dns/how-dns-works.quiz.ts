import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which server holds the actual A record for www.example.com?',
    options: [
      { text: 'The root name server' },
      { text: 'The .com TLD name server' },
      { text: 'The authoritative name server for example.com', correct: true },
      { text: 'The browser cache' },
    ],
    explanation:
      'Root and TLD servers only provide referrals; the authoritative server stores the domain’s records.',
  },
  {
    prompt: 'What is a downside of setting a very long TTL on a DNS record?',
    options: [
      { text: 'Clients perform more lookups' },
      { text: 'Changes such as a new IP address take longer to reach clients', correct: true },
      { text: 'The authoritative server must store more data' },
    ],
    explanation:
      'Caches keep the old answer until the TTL expires, so long TTLs slow down propagation.',
  },
  {
    prompt: 'Which techniques help DNS remain highly available?',
    options: [
      { text: 'Anycast routing to many server instances', correct: true },
      { text: 'Multiple authoritative servers per zone', correct: true },
      { text: 'Strong consistency between all caches' },
      { text: 'Hierarchical delegation of responsibility', correct: true },
    ],
    explanation:
      'DNS favours availability and uses eventual consistency, so caches may briefly serve stale data.',
  },
])
