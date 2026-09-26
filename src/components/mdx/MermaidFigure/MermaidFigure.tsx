/**
 * Renders a diagram pre-rendered at build time by build/remark-mermaid-svg.ts.
 * Both theme variants are inlined; CSS picks the one matching the active theme.
 */
export function MermaidFigure({ light, dark }: { light: string; dark: string }) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border bg-card p-4" role="img">
      <div className="mermaid-svg dark:hidden" dangerouslySetInnerHTML={{ __html: light }} />
      <div className="mermaid-svg hidden dark:block" dangerouslySetInnerHTML={{ __html: dark }} />
    </div>
  )
}
