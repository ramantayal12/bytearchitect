import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'A company routes all employee web traffic through a server that blocks certain sites. What is it?',
    options: [
      { text: 'A forward proxy', correct: true },
      { text: 'A reverse proxy' },
      { text: 'A database replica' },
    ],
    explanation: 'It acts on behalf of the clients inside the company.',
  },
  {
    prompt: 'Which are typical functions of a reverse proxy?',
    multi: true,
    options: [
      { text: 'TLS termination', correct: true },
      { text: 'Load balancing across backends', correct: true },
      { text: 'Routing paths to different services', correct: true },
      { text: 'Hiding employees’ identities from websites' },
    ],
    explanation: 'Hiding client identities is a forward proxy function.',
  },
  {
    prompt: 'Why is a CDN considered a kind of reverse proxy?',
    options: [
      {
        text: 'It sits in front of origin servers and serves clients on their behalf',
        correct: true,
      },
      { text: 'It is configured by each end user' },
      { text: 'It forwards company traffic to the internet' },
    ],
    explanation: 'Clients talk to the CDN as if it were the service.',
  },
])
