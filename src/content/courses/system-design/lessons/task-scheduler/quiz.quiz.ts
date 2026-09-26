import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which component is the source of truth for task state?',
    options: [
      { text: 'The durable task store', correct: true },
      { text: 'The executor’s memory' },
      { text: 'The priority queue' },
    ],
    explanation: 'Queues and executors are transient; the task store persists state.',
  },
  {
    prompt: 'Which techniques mitigate retry storms against a failing dependency?',
    options: [
      { text: 'Exponential backoff', correct: true },
      { text: 'Random jitter', correct: true },
      { text: 'Immediate retries in a tight loop' },
    ],
    explanation: 'Tight loops amplify load on the failing dependency.',
  },
  {
    prompt:
      'A long-running task is retried after a crash. What lets it resume rather than restart?',
    options: [
      { text: 'Checkpointing progress', correct: true },
      { text: 'Increasing its priority' },
      { text: 'Disabling leases' },
    ],
    explanation: 'Checkpoints save intermediate progress durably.',
  },
  {
    prompt: 'Why run tasks in containers with resource limits?',
    options: [
      { text: 'To isolate tasks so one cannot exhaust resources for others', correct: true },
      { text: 'To make tasks idempotent' },
      { text: 'To avoid the need for scheduling' },
    ],
    explanation: 'Isolation protects neighbors on shared workers.',
  },
  {
    prompt: 'What does fair queuing across tenants achieve?',
    options: [
      {
        text: 'A tenant with a huge backlog cannot delay tenants with small workloads indefinitely',
        correct: true,
      },
      { text: 'All tasks finish at the same time' },
      { text: 'Tasks run in strict submission order' },
    ],
    explanation: 'Executors alternate between tenants instead of draining one backlog first.',
  },
  {
    prompt: 'Why add jitter to recurring schedules?',
    options: [
      { text: 'To avoid thousands of tasks firing at exactly the same moment', correct: true },
      { text: 'To make tasks more precise' },
      { text: 'To reduce storage usage' },
    ],
    explanation: 'Spreading start times flattens load spikes.',
  },
])
