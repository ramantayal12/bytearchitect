import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'In what order does the SCALED framework proceed?',
    options: [
      { text: 'Scope → Capacity → API → Layout → Evolve → Defend', correct: true },
      { text: 'Layout → Scope → API → Capacity → Defend → Evolve' },
      { text: 'API → Scope → Layout → Capacity → Evolve → Defend' },
    ],
    explanation:
      'Requirements come first, then estimates, interfaces, the high-level layout, deep dives and evaluation.',
  },
  {
    prompt: 'Which question best helps scope a “design a chat app” prompt?',
    options: [
      { text: 'Should messages be stored in JSON or Protocol Buffers?' },
      {
        text: 'Are we designing one-to-one chats, large groups or both, and roughly how many users?',
        correct: true,
      },
      { text: 'Which cloud provider should we use?' },
    ],
    explanation:
      'Feature scope and scale change the architecture; serialization format and vendor rarely do at this stage.',
  },
  {
    prompt: 'Why perform capacity estimation?',
    options: [
      { text: 'To produce exact numbers for billing' },
      {
        text: 'To find the order of magnitude of load and data so you can justify design decisions',
        correct: true,
      },
      { text: 'Because interviewers require precise arithmetic' },
    ],
    explanation: 'Rounded estimates reveal whether you need sharding, caching or more bandwidth.',
  },
  {
    prompt: 'Which behaviors are signals of a strong candidate?',
    options: [
      { text: 'Walking through a read and a write request end to end', correct: true },
      { text: 'Identifying single points of failure proactively', correct: true },
      { text: 'Adding every popular technology to the diagram' },
      { text: 'Explaining alternatives and why they were not chosen', correct: true },
    ],
    explanation: 'Unjustified technologies are a trap; the other behaviors show clear reasoning.',
  },
  {
    prompt: 'What is the best way to handle a part of the design you are unsure about?',
    options: [
      { text: 'Stay silent until you are certain' },
      { text: 'Reason out loud from first principles and state your assumptions', correct: true },
      { text: 'Skip it without mentioning it' },
    ],
    explanation: 'Visible reasoning earns credit even when the final answer is imperfect.',
  },
  {
    prompt: 'A strong preparation plan typically ends with which phase?',
    options: [
      { text: 'Learning estimation formulas' },
      { text: 'Timed mock interviews with a peer', correct: true },
      { text: 'Reading about new technologies' },
    ],
    explanation:
      'Mock interviews build the communication and time-management skills that reading cannot.',
  },
  {
    prompt: 'Where should most deep-dive time be spent?',
    options: [
      { text: 'On the component the candidate knows best, regardless of the problem' },
      {
        text: 'On the genuinely hard or interesting parts of this specific problem',
        correct: true,
      },
      { text: 'On the user interface' },
    ],
    explanation:
      'Depth on the hardest part demonstrates the most skill and addresses the core challenge.',
  },
])
