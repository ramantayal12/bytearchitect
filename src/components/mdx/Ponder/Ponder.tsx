import { ChevronDown, HelpCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

/**
 * A question for the learner to think about, with the answer hidden until they
 * reveal it. Put the answer (markdown) inside.
 */
export function Ponder({ question, children }: { question: string; children: ReactNode }) {
  return (
    <Collapsible className="group my-6 rounded-lg border border-border bg-muted/40 p-4">
      <p className="!my-0 flex items-start gap-3 font-semibold">
        <HelpCircle className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
        <span>
          <span className="block text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Point to ponder
          </span>
          {question}
        </span>
      </p>
      <CollapsibleTrigger className="mt-3 ml-8 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
        <span className="group-data-[state=open]:hidden">Show answer</span>
        <span className="hidden group-data-[state=open]:inline">Hide answer</span>
        <ChevronDown
          className="size-4 transition-transform group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 ml-8 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
