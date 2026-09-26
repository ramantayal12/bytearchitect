import { Children, isValidElement, type ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TabProps {
  label: string
  children?: ReactNode
}

/** A single tab panel inside <TabGroup>. */
export function Tab({ children }: TabProps) {
  return <>{children}</>
}

/** Side-by-side alternatives, e.g. comparing two designs or two data models. */
export function TabGroup({ children }: { children: ReactNode }) {
  const tabs = Children.toArray(children).filter(isValidElement<TabProps>)
  const first = tabs[0]?.props.label
  if (!first) return null
  return (
    <Tabs defaultValue={first} className="not-prose my-6">
      <TabsList>
        {tabs.map((t) => (
          <TabsTrigger key={t.props.label} value={t.props.label}>
            {t.props.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent
          key={t.props.label}
          value={t.props.label}
          className="prose prose-lg max-w-none prose-neutral dark:prose-invert"
        >
          {t.props.children}
        </TabsContent>
      ))}
    </Tabs>
  )
}
