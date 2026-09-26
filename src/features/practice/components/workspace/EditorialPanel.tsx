import { Eye, Lightbulb } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { LoadedProblem } from '../../practice.types'
import { CodeEditor } from '../CodeEditor'

/** The editorial and reference code; hidden until revealed, unless the problem is solved. */
export function EditorialPanel({ loaded, solved }: { loaded: LoadedProblem; solved: boolean }) {
  const [revealed, setRevealed] = useState(false)
  const { Editorial, definition } = loaded

  if (!revealed && !solved)
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
        <Lightbulb className="size-8 text-primary" />
        <div className="grid gap-1">
          <p className="font-medium">Try it yourself first</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            The solution explains the approach and shows reference code in JavaScript and Python.
          </p>
        </div>
        <Button variant="outline" onClick={() => setRevealed(true)}>
          <Eye /> Show solution
        </Button>
      </div>
    )

  return (
    <div className="grid grid-cols-1 gap-6 px-5 py-5">
      {Editorial && (
        <div className="prose max-w-none prose-neutral dark:prose-invert prose-a:text-primary prose-code:before:content-none prose-code:after:content-none">
          <Editorial />
        </div>
      )}
      <Tabs defaultValue="javascript">
        <TabsList>
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="python">Python 3</TabsTrigger>
        </TabsList>
        {(['javascript', 'python'] as const).map((language) => (
          <TabsContent
            key={language}
            value={language}
            className="overflow-hidden rounded-lg border"
          >
            <CodeEditor
              value={definition.solution[language].trim() + '\n'}
              language={language}
              readOnly
              aria-label={`Reference solution in ${language === 'python' ? 'Python' : 'JavaScript'}`}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
