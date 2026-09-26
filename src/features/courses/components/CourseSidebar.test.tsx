import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { TooltipProvider } from '@/components/ui/tooltip'
import { applyPatch, emptyProgress, type CourseProgress } from '@/features/progress'
import { defineCourse } from '../defineCourse'
import { chapter, lesson, part, quiz } from '../outline'
import { CourseSidebar } from './CourseSidebar'

const course = defineCourse({
  meta: {
    id: 'c',
    title: 'Test Course',
    subtitle: '',
    description: '',
    level: 'Beginner',
    highlights: [],
  },
  parts: [
    part('p1', 'Part I · Basics', [
      chapter('intro', 'Introduction', [lesson('welcome', 'Welcome')]),
    ]),
    part('p2', 'Part II · Blocks', [
      chapter('dns', 'Domain Name System', [
        lesson('overview', 'How DNS Works'),
        quiz('quiz', 'Quiz: DNS'),
      ]),
      chapter('databases', 'Databases', [lesson('types', 'Types of Databases')]),
    ]),
  ],
  files: async () => ({ lessonFiles: {}, quizFiles: {} }),
})

const renderSidebar = (progress?: CourseProgress, onReset = vi.fn()) => {
  render(
    <MemoryRouter>
      <TooltipProvider>
        <CourseSidebar
          course={course}
          currentLessonId="intro/welcome"
          progress={progress}
          onReset={onReset}
        />
      </TooltipProvider>
    </MemoryRouter>,
  )
  return { onReset }
}

describe('<CourseSidebar />', () => {
  beforeAll(() => {
    // jsdom implements neither: the sidebar scrolls the current lesson into view and
    // Radix tooltips measure their trigger.
    Element.prototype.scrollIntoView = vi.fn()
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    )
  })

  it('numbers chapters across parts without part headings', () => {
    renderSidebar()
    const nav = screen.getByRole('navigation', { name: 'Course contents' })
    expect(
      within(nav)
        .getAllByRole('button')
        .map((b) => b.textContent),
    ).toEqual(['1.Introduction', '2.Domain Name System', '3.Databases'])
    expect(screen.queryByText(/Part I/)).not.toBeInTheDocument()
    // Only the chapter holding the current lesson starts expanded.
    expect(screen.getByRole('link', { name: /welcome/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /how dns works/i })).not.toBeInTheDocument()
  })

  it('filters and expands chapters while searching', async () => {
    const user = userEvent.setup()
    renderSidebar()
    await user.type(screen.getByRole('searchbox', { name: /search/i }), 'dns')

    const nav = screen.getByRole('navigation', { name: 'Course contents' })
    expect(
      within(nav)
        .getAllByRole('button')
        .map((b) => b.textContent),
    ).toEqual(['2.Domain Name System'])
    expect(screen.getByRole('link', { name: /how dns works/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /quiz: dns/i })).toBeInTheDocument()

    await user.clear(screen.getByRole('searchbox', { name: /search/i }))
    await user.type(screen.getByRole('searchbox', { name: /search/i }), 'zzz')
    expect(screen.getByText(/no lessons match/i)).toBeInTheDocument()
  })

  it('hides the reset button for guests', () => {
    renderSidebar()
    expect(screen.queryByRole('button', { name: /reset progress/i })).not.toBeInTheDocument()
  })

  it('resets progress after confirmation and marks bookmarked lessons', async () => {
    const user = userEvent.setup()
    const progress = applyPatch(emptyProgress(), {
      completed: { 'intro/welcome': true },
      bookmarks: { 'intro/welcome': true },
    })
    const { onReset } = renderSidebar(progress)

    expect(screen.getByLabelText('Bookmarked')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /reset progress/i }))
    expect(onReset).not.toHaveBeenCalled()
    await user.click(
      within(screen.getByRole('alertdialog')).getByRole('button', { name: /reset progress/i }),
    )
    expect(onReset).toHaveBeenCalledOnce()
  })
})
