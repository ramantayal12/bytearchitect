import { cn } from '@/lib/utils'

/** A labelled, monospaced value: an input, output, expected output or stdout. */
export function ValueBlock({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: 'error'
}) {
  return (
    <div className="grid gap-1.5">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <pre
        className={cn(
          'max-h-60 overflow-auto rounded-md bg-muted/70 px-3 py-2 font-mono text-[13px] break-all whitespace-pre-wrap',
          tone === 'error' && 'bg-destructive/10 text-destructive',
        )}
      >
        {value}
      </pre>
    </div>
  )
}
