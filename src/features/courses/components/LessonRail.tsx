import { Check } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useActiveHeading, useScrollPercent, type Heading } from '../reading.hooks'

interface LessonRailProps {
  headings: Heading[]
  completed: boolean
  /** Toggles lesson completion. The reading ring is hidden without it (guests). */
  onToggleComplete?: () => void
}

/** Right-hand rail: a dash-style mini table of contents and a reading-progress ring. */
export function LessonRail({ headings, completed, onToggleComplete }: LessonRailProps) {
  return (
    <div className="flex flex-col items-center gap-10 pt-14">
      {headings.length >= 2 && <MiniToc headings={headings} />}
      {onToggleComplete && <ReadingRing completed={completed} onToggle={onToggleComplete} />}
    </div>
  )
}

/** Collapsed to one dash per heading; expands into a list of links on hover or keyboard focus. */
function MiniToc({ headings }: { headings: Heading[] }) {
  const active = useActiveHeading(headings)
  return (
    <nav aria-label="On this page" className="group relative">
      <ul className="flex flex-col items-end gap-2.5 py-2" aria-hidden>
        {headings.map((h) => (
          <li
            key={h.id}
            className={cn(
              'h-0.5 rounded-full transition-all',
              h.id === active
                ? 'w-5 bg-foreground'
                : cn('bg-muted-foreground/40', h.level === 2 ? 'w-4' : 'w-3'),
            )}
          />
        ))}
      </ul>
      {/* Hidden with opacity (not visibility) so the links stay reachable with Tab. */}
      <div className="pointer-events-none absolute -top-2 right-0 z-30 w-64 opacity-0 transition-opacity group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
        <ul className="max-h-[70vh] overflow-y-auto rounded-lg border bg-popover p-2 text-sm shadow-lg">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={h.id === active ? 'location' : undefined}
                className={cn(
                  'block rounded-md px-3 py-1.5 leading-snug text-muted-foreground hover:bg-accent hover:text-foreground',
                  h.level === 3 && 'pl-6',
                  h.id === active && 'font-medium text-foreground',
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

const RADIUS = 16
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** Fills as the reader scrolls; shows a check once the lesson is completed. Click toggles completion. */
function ReadingRing({ completed, onToggle }: { completed: boolean; onToggle: () => void }) {
  const percent = useScrollPercent()
  const filled = completed ? 1 : percent / 100
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={completed}
          aria-label="Lesson completed"
          className="relative grid size-10 place-items-center rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden>
            <circle
              cx="20"
              cy="20"
              r={RADIUS}
              fill="none"
              strokeWidth="3"
              className="stroke-muted-foreground/30"
            />
            <circle
              cx="20"
              cy="20"
              r={RADIUS}
              fill="none"
              strokeWidth="3"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - filled)}
              className={cn(
                'transition-[stroke-dashoffset] duration-200',
                completed ? 'stroke-success' : 'stroke-primary',
              )}
            />
          </svg>
          {completed && <Check className="size-4 text-success" aria-hidden />}
        </button>
      </TooltipTrigger>
      <TooltipContent side="left">
        {completed ? 'Completed · Mark as not completed' : `${percent}% read · Mark as completed`}
      </TooltipContent>
    </Tooltip>
  )
}
