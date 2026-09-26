import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const MAX_CUSTOM_CASES = 8

/** Editable inputs for "Run": one JSON value per parameter, per case. */
export function TestcasePanel({
  names,
  cases,
  onChange,
  selected,
  onSelect,
  error,
}: {
  names: string[]
  cases: string[][]
  onChange: (cases: string[][]) => void
  selected: number
  onSelect: (index: number) => void
  error?: string
}) {
  const current = cases[selected] ?? cases[0] ?? []
  const update = (param: number, text: string) =>
    onChange(cases.map((c, i) => (i === selected ? c.map((t, j) => (j === param ? text : t)) : c)))
  const add = () => {
    onChange([...cases, [...current]])
    onSelect(cases.length)
  }
  const remove = (index: number) => {
    onChange(cases.filter((_, i) => i !== index))
    onSelect(Math.max(0, selected >= index ? selected - 1 : selected))
  }

  return (
    <div className="grid gap-4 p-4">
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Test cases">
        {cases.map((_, i) => (
          <div key={i} className="group relative">
            <button
              type="button"
              role="tab"
              aria-selected={i === selected}
              onClick={() => onSelect(i)}
              className={cn(
                'rounded-md px-3 py-1 text-sm',
                i === selected
                  ? 'bg-secondary font-medium text-foreground'
                  : 'text-muted-foreground hover:bg-accent',
              )}
            >
              Case {i + 1}
            </button>
            {cases.length > 1 && (
              <button
                type="button"
                aria-label={`Remove case ${i + 1}`}
                onClick={() => remove(i)}
                className="absolute -top-1.5 -right-1.5 hidden size-4 items-center justify-center rounded-full bg-muted-foreground text-background group-hover:flex focus-visible:flex"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        ))}
        {cases.length < MAX_CUSTOM_CASES && (
          <button
            type="button"
            aria-label="Add a test case"
            onClick={add}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Plus className="size-4" />
          </button>
        )}
      </div>

      {names.map((name, j) => (
        <label key={name} className="grid gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">{name} =</span>
          <textarea
            value={current[j] ?? ''}
            onChange={(e) => update(j, e.target.value)}
            spellCheck={false}
            rows={Math.min(6, Math.max(1, Math.ceil((current[j]?.length ?? 0) / 80)))}
            className="resize-y rounded-md border bg-muted/40 px-3 py-2 font-mono text-[13px] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </label>
      ))}

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        Inputs are JSON. Expected outputs for your own inputs come from the reference solution.
      </p>
    </div>
  )
}
