import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Which component performs recursive lookups on behalf of clients and caches the results?',
    options: [
      { text: 'Root name server' },
      { text: 'Recursive resolver', correct: true },
      { text: 'TLD name server' },
    ],
    explanation:
      'Resolvers do the legwork of walking the hierarchy and cache answers for other clients.',
  },
  {
    prompt:
      'You plan to migrate a service to new IP addresses next week. What should you do with the DNS TTL beforehand?',
    options: [
      { text: 'Increase it to reduce load' },
      { text: 'Lower it so the change propagates quickly', correct: true },
      { text: 'Leave it unchanged; TTL does not affect propagation' },
    ],
    explanation:
      'Caches hold records until the TTL expires, so lowering it in advance speeds up the cutover.',
  },
  {
    prompt: 'Which record type creates an alias from one name to another?',
    options: [{ text: 'NS' }, { text: 'CNAME', correct: true }, { text: 'TXT' }],
    explanation: 'A CNAME points one name at another canonical name.',
  },
  {
    prompt: 'What consistency model does DNS provide?',
    options: [
      { text: 'Strong consistency' },
      { text: 'Eventual consistency', correct: true },
      { text: 'Linearizability' },
    ],
    explanation: 'Updates propagate as caches expire; clients may briefly see stale records.',
  },
  {
    prompt: 'Which techniques help DNS handle massive query volumes?',
    options: [
      { text: 'Caching with TTLs at many layers', correct: true },
      { text: 'Anycast routing to nearby server instances', correct: true },
      { text: 'Hierarchical delegation', correct: true },
      { text: 'Requiring every query to reach the root server' },
    ],
    explanation: 'Most queries are answered from caches and never reach the root servers.',
  },
  {
    prompt: 'Why is DNS-based failover not instantaneous?',
    options: [
      {
        text: 'Clients and resolvers may keep using cached records until the TTL expires',
        correct: true,
      },
      { text: 'DNS servers must be restarted to change records' },
      { text: 'Failover requires a new domain name' },
    ],
    explanation:
      'Caching, and clients that ignore TTLs, delay failover — so DNS is usually combined with load balancers.',
  },
])
