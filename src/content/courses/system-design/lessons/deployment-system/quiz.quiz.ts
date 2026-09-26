import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which practices limit the blast radius of a bad deployment?',
    multi: true,
    options: [
      { text: 'Canary hosts before wider waves', correct: true },
      { text: 'Never deploying to more than one region in a single wave', correct: true },
      { text: 'Bake time with health checks between waves', correct: true },
      { text: 'Deploying to all hosts simultaneously' },
    ],
    explanation: 'Gradual, observed rollouts catch problems early.',
  },
  {
    prompt: 'How is a rollback performed in a desired-state system?',
    options: [
      {
        text: 'Set the desired version back to the previous artifact; agents reconcile',
        correct: true,
      },
      { text: 'Rebuild the old commit from scratch on every host' },
      { text: 'Manually log in to each host' },
    ],
    explanation: 'Rollback reuses the same reconciliation mechanism.',
  },
  {
    prompt: 'Why are artifacts immutable and signed?',
    options: [
      {
        text: 'Hosts can verify they run exactly the reviewed build and nothing tampered with',
        correct: true,
      },
      { text: 'To make builds faster' },
      { text: 'Because containers require signatures to start' },
    ],
    explanation: 'Immutability and signatures give integrity and traceability.',
  },
  {
    prompt: 'What does pre-staging artifacts achieve?',
    options: [
      {
        text: 'Downloads happen before the rollout, so each wave only switches versions quickly',
        correct: true,
      },
      { text: 'It skips testing' },
      { text: 'It deploys the artifact to production immediately' },
    ],
    explanation: 'Separating download from activation speeds waves and rollbacks.',
  },
  {
    prompt: 'Why allow only one active deployment per service at a time?',
    options: [
      {
        text: 'To prevent conflicting desired versions from concurrent deployments',
        correct: true,
      },
      { text: 'Because agents can only run once per day' },
      { text: 'To reduce the number of artifacts stored' },
    ],
    explanation: 'Concurrency control keeps the desired state unambiguous.',
  },
  {
    prompt: 'How do feature flags complement deployments?',
    options: [
      {
        text: 'Code can be deployed dark and features enabled or disabled at runtime without redeploying',
        correct: true,
      },
      { text: 'They replace the need for a build service' },
      { text: 'They guarantee code has no bugs' },
    ],
    explanation: 'Decoupling release from deploy reduces risk and speeds rollback of features.',
  },
])
