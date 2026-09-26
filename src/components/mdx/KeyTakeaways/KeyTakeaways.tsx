import { Target } from 'lucide-react'
import type { ReactNode } from 'react'

/** End-of-lesson summary box. Put a markdown bullet list inside. */
export function KeyTakeaways({ children }: { children: ReactNode }) {
  return (
    <section className="my-8 rounded-xl border border-primary/30 bg-primary/5 p-5">
      <h3 className="!mt-0 flex items-center gap-2 text-base">
        <Target className="size-5 text-primary" aria-hidden /> Key takeaways
      </h3>
      <div className="[&>ul]:mb-0">{children}</div>
    </section>
  )
}
