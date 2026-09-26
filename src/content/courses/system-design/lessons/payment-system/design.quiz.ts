import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why does the payment state machine include an Unknown state?',
    options: [
      {
        text: 'A timeout does not reveal whether the PSP charged the card, so the outcome must be determined before acting',
        correct: true,
      },
      { text: 'To store payments that were never requested' },
      { text: 'Because card networks return Unknown for every payment' },
    ],
    explanation:
      'The system resolves Unknown via status checks or webhooks, never by blind retries with a new key.',
  },
  {
    prompt:
      'A 50.00 order has a 5.00 marketplace fee. Which ledger entries balance the transaction?',
    options: [
      {
        text: 'Debit receivable 50.00; credit seller payable 45.00; credit fee revenue 5.00',
        correct: true,
      },
      { text: 'Credit receivable 50.00 only' },
      { text: 'Debit seller payable 50.00; debit fee revenue 5.00' },
    ],
    explanation: 'Total debits (50.00) equal total credits (45.00 + 5.00).',
  },
  {
    prompt: 'Why store monetary amounts as integers in the smallest currency unit?',
    options: [
      { text: 'Floating-point arithmetic introduces rounding errors', correct: true },
      { text: 'Integers use more storage, which improves durability' },
      { text: 'Currencies do not have decimal places' },
    ],
    explanation: 'Integer cents avoid binary floating-point inaccuracies.',
  },
])
