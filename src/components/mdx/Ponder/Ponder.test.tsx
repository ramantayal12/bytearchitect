import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Ponder } from './Ponder'

describe('<Ponder />', () => {
  it('shows the question and reveals the answer on demand', async () => {
    const user = userEvent.setup()
    render(
      <Ponder question="Why cache?">
        <p>Memory is faster than disk.</p>
      </Ponder>,
    )

    expect(screen.getByText('Why cache?')).toBeInTheDocument()
    expect(screen.queryByText('Memory is faster than disk.')).not.toBeInTheDocument()

    const toggle = screen.getByRole('button', { name: /show answer/i })
    await user.click(toggle)
    expect(screen.getByText('Memory is faster than disk.')).toBeInTheDocument()
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await user.click(toggle)
    expect(screen.queryByText('Memory is faster than disk.')).not.toBeInTheDocument()
  })
})
