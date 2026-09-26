import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { QuizDefinition } from '../quiz.types'
import { Quiz } from './Quiz'

const questions: QuizDefinition = [
  {
    prompt: 'Which is a cache?',
    options: [{ text: 'Redis', correct: true, explanation: 'In-memory store.' }, { text: 'Nginx' }],
    explanation: 'Redis is commonly used as a cache.',
  },
  {
    prompt: 'Which are databases?',
    options: [
      { text: 'PostgreSQL', correct: true },
      { text: 'Cassandra', correct: true },
      { text: 'Kafka' },
    ],
  },
]

describe('<Quiz />', () => {
  it('walks through questions, grades, reveals explanations and supports retry', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<Quiz questions={questions} onSubmit={onSubmit} />)

    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
    const next = screen.getByRole('button', { name: /next/i })
    expect(next).toBeDisabled()
    await user.click(screen.getByRole('radio', { name: /redis/i }))
    await user.click(next)

    expect(screen.getByText(/select all that apply/i)).toBeInTheDocument()
    await user.click(screen.getByRole('checkbox', { name: /postgresql/i }))
    await user.click(screen.getByRole('button', { name: /submit answers/i }))

    expect(onSubmit).toHaveBeenCalledWith({ correct: 1, total: 2, perQuestion: [true, false] })
    expect(screen.getByText(/you scored 1 \/ 2/i)).toBeInTheDocument()
    expect(screen.getByText('Redis is commonly used as a cache.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /retake quiz/i }))
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
  })
})
