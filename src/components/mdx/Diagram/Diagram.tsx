import type { ReactNode } from 'react'

/** Optional wrapper around a ```mermaid fence to add a caption. */
export function Diagram({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="my-6 [&>div]:my-0">
      {children}
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
