import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  indentUnit,
  syntaxHighlighting,
} from '@codemirror/language'
import { Compartment, EditorState, type Extension } from '@codemirror/state'
import { oneDarkHighlightStyle } from '@codemirror/theme-one-dark'
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from '@codemirror/view'
import { useEffect, useRef } from 'react'
import { useTheme } from '@/components/theme'
import { cn } from '@/lib/utils'
import type { Language } from '../../practice.types'

const MONO_FONT = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'

/** CodeMirror's `basicSetup` without the search panel and lint keymap, to keep the chunk small. */
const setup: Extension = [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
  ]),
]

/** Follows the app's light/dark tokens, so the editor matches the rest of the UI. */
const appTheme = EditorView.theme({
  '&': { height: '100%', fontSize: '14px', backgroundColor: 'var(--background)' },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': { fontFamily: MONO_FONT, lineHeight: '1.6' },
  '.cm-content': { caretColor: 'var(--foreground)' },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--foreground)' },
  '.cm-gutters': {
    backgroundColor: 'var(--background)',
    color: 'var(--muted-foreground)',
    border: 'none',
  },
  '.cm-activeLine': { backgroundColor: 'color-mix(in oklch, var(--muted) 70%, transparent)' },
  '.cm-activeLineGutter': { backgroundColor: 'transparent', color: 'var(--foreground)' },
  '.cm-selectionBackground, &.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground':
    { backgroundColor: 'color-mix(in oklch, var(--primary) 28%, transparent)' },
  '.cm-tooltip': {
    backgroundColor: 'var(--popover)',
    color: 'var(--popover-foreground)',
    border: '1px solid var(--border)',
  },
})

/** Grammars are code-split per language, so learners only download the one they use. */
const loadLanguage: Record<Language, () => Promise<Extension>> = {
  javascript: () => import('@codemirror/lang-javascript').then((m) => m.javascript()),
  typescript: () =>
    import('@codemirror/lang-javascript').then((m) => m.javascript({ typescript: true })),
  python: () => import('@codemirror/lang-python').then((m) => m.python()),
}

const indentation = (language: Language): Extension => [
  indentUnit.of(language === 'python' ? '    ' : '  '),
  EditorState.tabSize.of(language === 'python' ? 4 : 2),
]

// The light highlight style is a fallback; the dark one replaces it.
const highlighting = (dark: boolean): Extension =>
  dark ? syntaxHighlighting(oneDarkHighlightStyle) : []

const editability = (readOnly: boolean): Extension => [
  EditorState.readOnly.of(readOnly),
  EditorView.editable.of(!readOnly),
]

export interface CodeEditorProps {
  value: string
  language: Language
  onChange?: (value: string) => void
  readOnly?: boolean
  /** Ctrl/⌘ + ' — LeetCode's "Run" shortcut. */
  onRun?: () => void
  /** Ctrl/⌘ + Enter — LeetCode's "Submit" shortcut. */
  onSubmit?: () => void
  className?: string
  'aria-label'?: string
}

/** CodeMirror 6 editor; also used read-only to display solutions and past submissions. */
export default function CodeMirrorEditor({
  value,
  language,
  onChange,
  readOnly = false,
  onRun,
  onSubmit,
  className,
  'aria-label': ariaLabel = 'Code editor',
}: CodeEditorProps) {
  const host = useRef<HTMLDivElement>(null)
  const view = useRef<EditorView | null>(null)
  const compartments = useRef({
    grammar: new Compartment(),
    indentation: new Compartment(),
    highlight: new Compartment(),
    editable: new Compartment(),
  })
  // Callbacks are read through a ref so the editor isn't rebuilt when they change.
  const callbacks = useRef({ onChange, onRun, onSubmit })
  useEffect(() => {
    callbacks.current = { onChange, onRun, onSubmit }
  })
  const dark = useTheme().resolvedTheme === 'dark'

  useEffect(() => {
    const c = compartments.current
    const shortcut = (name: 'onRun' | 'onSubmit') => () => {
      const fn = callbacks.current[name]
      fn?.()
      return Boolean(fn)
    }
    const editor = new EditorView({
      parent: host.current!,
      state: EditorState.create({
        doc: value,
        extensions: [
          keymap.of([
            { key: "Mod-'", run: shortcut('onRun') },
            { key: 'Mod-Enter', run: shortcut('onSubmit') },
            indentWithTab,
          ]),
          setup,
          appTheme,
          c.grammar.of([]),
          c.indentation.of(indentation(language)),
          c.highlight.of(highlighting(dark)),
          c.editable.of(editability(readOnly)),
          EditorView.contentAttributes.of({ 'aria-label': ariaLabel }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) callbacks.current.onChange?.(update.state.doc.toString())
          }),
        ],
      }),
    })
    view.current = editor
    return () => {
      editor.destroy()
      view.current = null
    }
    // The editor is created once; the effects below keep it in sync with props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const c = compartments.current
    view.current?.dispatch({ effects: c.indentation.reconfigure(indentation(language)) })
    let current = true
    loadLanguage[language]()
      .then((grammar) => {
        if (current) view.current?.dispatch({ effects: c.grammar.reconfigure(grammar) })
      })
      // Offline: the editor still works, just without syntax highlighting.
      .catch(() => {})
    return () => {
      current = false
    }
  }, [language])

  useEffect(() => {
    view.current?.dispatch({
      effects: compartments.current.highlight.reconfigure(highlighting(dark)),
    })
  }, [dark])

  useEffect(() => {
    view.current?.dispatch({
      effects: compartments.current.editable.reconfigure(editability(readOnly)),
    })
  }, [readOnly])

  // Replace the document when the value changes from outside (reset, language switch, restore).
  useEffect(() => {
    const editor = view.current
    if (editor && editor.state.doc.toString() !== value)
      editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: value } })
  }, [value])

  return <div ref={host} className={cn('min-h-0 overflow-hidden', className)} />
}
