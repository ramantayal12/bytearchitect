import { lazy, Suspense } from 'react'
import { cn } from '@/lib/utils'
import type { CodeEditorProps } from './editor/CodeMirrorEditor'

export type { CodeEditorProps }

const CodeMirrorEditor = lazy(() => import('./editor/CodeMirrorEditor'))

/** The code editor, code-split: CodeMirror is the largest part of the practice pages. */
export function CodeEditor(props: CodeEditorProps) {
  return (
    <Suspense
      fallback={<div aria-busy="true" className={cn('min-h-24 bg-background', props.className)} />}
    >
      <CodeMirrorEditor {...props} />
    </Suspense>
  )
}
