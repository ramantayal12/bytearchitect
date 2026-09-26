import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the top requirement of a payment system?',
    options: [
      { text: 'Never double-charge or lose money, even under failures and retries', correct: true },
      { text: 'Process millions of payments per second' },
      { text: 'Minimize the number of database tables' },
    ],
    explanation: 'Correctness dominates; throughput is usually modest.',
  },
  {
    prompt: 'Which mechanisms together prevent double charges?',
    multi: true,
    options: [
      { text: 'Idempotency keys sent to the PSP', correct: true },
      {
        text: 'A unique constraint on the idempotency key in the payments database',
        correct: true,
      },
      { text: 'Resolving Unknown payments by querying status with the same key', correct: true },
      { text: 'Retrying timeouts with a freshly generated key' },
    ],
    explanation: 'A fresh key on retry is exactly how double charges happen.',
  },
  {
    prompt: 'How is a refund recorded in an append-only ledger?',
    options: [
      { text: 'As a new, reversing transaction', correct: true },
      { text: 'By editing the original entries' },
      { text: 'By deleting the original transaction' },
    ],
    explanation: 'History is never modified, preserving the audit trail.',
  },
  {
    prompt: 'What is the role of reconciliation?',
    options: [
      {
        text: 'Compare internal records with PSP settlement reports and flag discrepancies',
        correct: true,
      },
      { text: 'Encrypt card numbers' },
      { text: 'Choose which PSP to use for each payment' },
    ],
    explanation: 'It is the safety net that catches bugs other mechanisms miss.',
  },
  {
    prompt: 'Why is the payment state written before calling the PSP?',
    options: [
      {
        text: 'So a crash mid-call leaves a record of intent that recovery jobs can resolve',
        correct: true,
      },
      { text: 'To make the PSP call faster' },
      { text: 'Because PSPs require it' },
    ],
    explanation: 'Recording intent first makes every external call recoverable.',
  },
  {
    prompt: 'What does a webhook from the PSP typically deliver?',
    options: [
      { text: 'Asynchronous updates such as captures, failures and chargebacks', correct: true },
      { text: 'The customer’s raw card number' },
      { text: 'New code deployments' },
    ],
    explanation: 'Webhooks feed outcomes into the payment state machines.',
  },
])
