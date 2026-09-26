import { useQuery } from '@tanstack/react-query'
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  CloudUpload,
  FileText,
  FlaskConical,
  History,
  Lightbulb,
  List,
  Loader2,
  Play,
  RotateCcw,
  Terminal,
} from 'lucide-react'
import { useRef, useState, type ReactNode } from 'react'
import { Group, Panel, Separator } from 'react-resizable-panels'
import { Link, useParams } from 'react-router'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FullPageSpinner } from '@/features/auth'
import { useCourseProgress, useUpdateProgress } from '@/features/progress'
import { cn } from '@/lib/utils'
import { CodeEditor } from '../components/CodeEditor'
import { NotFound } from '../components/NotFound'
import { DescriptionPanel } from '../components/workspace/DescriptionPanel'
import { EditorialPanel } from '../components/workspace/EditorialPanel'
import { ResultPanel, type RunState } from '../components/workspace/ResultPanel'
import { SubmissionsPanel } from '../components/workspace/SubmissionsPanel'
import { TestcasePanel } from '../components/workspace/TestcasePanel'
import { loadDraft, loadLanguage, saveDraft, saveLanguage } from '../drafts'
import { useProblemSet } from '../practice-context'
import type { Language, LoadedProblem, Problem, ProblemSet, TestCase } from '../practice.types'
import { inputNames, parseCaseTexts, problemKey, toCaseTexts } from '../problem.logic'
import type { RunRequest } from '../runner/protocol'
import { languages, starterCode } from '../signature'
import { MAX_CODE_LENGTH, toSubmission } from '../submission.logic'
import { useRecordSubmission } from '../submissions.hooks'
import { useCodeRunner, useMediaQuery } from '../workspace.hooks'

export default function ProblemPage() {
  const { setId, slug } = useParams()
  const problemSet = useProblemSet(setId)
  const problem = problemSet?.getProblem(slug ?? '')
  if (!problemSet || !problem) return <NotFound message="That problem doesn’t exist." />
  return <ProblemLoader key={problemKey(problem)} problemSet={problemSet} problem={problem} />
}

function ProblemLoader({ problemSet, problem }: { problemSet: ProblemSet; problem: Problem }) {
  const loaded = useQuery({
    queryKey: ['problem', problemKey(problem)],
    queryFn: () => problemSet.loadProblem(problem.slug),
    staleTime: Infinity,
    gcTime: 10 * 60_000,
  })
  if (loaded.isPending) return <FullPageSpinner />
  if (loaded.isError)
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <div
          role="alert"
          className="flex items-center gap-3 rounded-lg border border-destructive/40 p-4 text-sm"
        >
          <AlertTriangle className="size-5 text-destructive" />
          <span className="flex-1">This problem failed to load. You may be offline.</span>
          <Button variant="outline" size="sm" onClick={() => loaded.refetch()}>
            Retry
          </Button>
        </div>
      </div>
    )
  return <Workspace problemSet={problemSet} problem={problem} loaded={loaded.data} />
}

type SidePanel = 'description' | 'solution' | 'submissions'
type ConsoleTab = 'testcase' | 'result'

function Workspace({
  problemSet,
  problem,
  loaded,
}: {
  problemSet: ProblemSet
  problem: Problem
  loaded: LoadedProblem
}) {
  const { definition } = loaded
  const { signature } = definition
  const key = problemKey(problem)
  const names = inputNames(signature)
  const desktop = useMediaQuery('(min-width: 1024px)')
  const runner = useCodeRunner()
  const { data: progress } = useCourseProgress(problemSet.id)
  const updateProgress = useUpdateProgress(problemSet.id)
  const recordSubmission = useRecordSubmission(key)
  const solved = Boolean(progress && problem.slug in progress.completed)

  const [language, setLanguage] = useState<Language>(loadLanguage)
  const [code, setCode] = useState(
    () => loadDraft(key, language) ?? starterCode(signature, language),
  )
  const [sidePanel, setSidePanel] = useState<SidePanel>('description')
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>('testcase')
  const [cases, setCases] = useState(() => toCaseTexts(definition.examples))
  const [selectedCase, setSelectedCase] = useState(0)
  const [caseError, setCaseError] = useState<string>()
  const [run, setRun] = useState<RunState>()
  const [runCount, setRunCount] = useState(0)
  const [submissionId, setSubmissionId] = useState<string>()
  const running = useRef(false)

  const index = problem.number - 1
  const previous = problemSet.problems[index - 1]
  const next = problemSet.problems[index + 1]

  const showCode = (lang: Language, value: string) => {
    setLanguage(lang)
    saveLanguage(lang)
    setCode(value)
  }
  const editCode = (value: string) => {
    setCode(value)
    saveDraft(key, language, value)
  }
  const switchLanguage = (lang: Language) =>
    showCode(lang, loadDraft(key, lang) ?? starterCode(signature, lang))
  const resetCode = () => {
    saveDraft(key, language, null)
    setCode(starterCode(signature, language))
  }
  const restoreSubmission = (lang: Language, value: string) => {
    showCode(lang, value)
    saveDraft(key, lang, value)
    toast.success('Submission loaded into the editor.')
  }

  async function execute(mode: RunState['mode']) {
    if (running.current) return
    if (code.length > MAX_CODE_LENGTH) {
      toast.error(`Your code is longer than ${MAX_CODE_LENGTH.toLocaleString()} characters.`)
      return
    }
    let tests: TestCase[]
    if (mode === 'run') {
      const parsed = parseCaseTexts(cases, names)
      if ('error' in parsed) {
        setCaseError(parsed.error)
        setSelectedCase(parsed.index)
        setConsoleTab('testcase')
        return
      }
      tests = parsed.tests
    } else {
      tests = [...definition.examples, ...definition.tests]
    }

    running.current = true
    setCaseError(undefined)
    setRun({ mode, running: true, tests })
    setRunCount((n) => n + 1)
    setConsoleTab('result')
    const request: RunRequest = {
      language,
      code,
      signature,
      tests,
      compare: definition.compare ?? 'exact',
      stopOnFailure: mode === 'submit',
      ...(mode === 'run' && { reference: definition.solution.javascript }),
    }
    const outcome = await runner.run(request, (status) => setRun((r) => r && { ...r, status }))
    running.current = false
    setRun({ mode, running: false, tests, outcome })

    if (mode !== 'submit' || outcome.kind !== 'judged') return
    recordSubmission.mutate(toSubmission(outcome, tests, signature, language, code), {
      onSuccess: (saved) => {
        setSubmissionId(saved.id)
        setSidePanel('submissions')
      },
    })
    if (outcome.verdict === 'Accepted') {
      toast.success('Accepted! Your solution passed every test case.')
      if (!solved)
        updateProgress.mutate({ completed: { [problem.slug]: true }, lastLessonId: problem.slug })
    }
  }

  const busy = run?.running ?? false
  const problemUrl = (p: Problem) => `/practice/${problemSet.id}/${p.slug}`

  const toolbar = (
    <div className="flex h-12 shrink-0 items-center gap-1 border-b px-3">
      <Button variant="ghost" size="sm" asChild>
        <Link to={`/practice/${problemSet.id}`}>
          <List /> <span className="hidden sm:inline">Problem list</span>
        </Link>
      </Button>
      <NavButton to={previous && problemUrl(previous)} label="Previous problem">
        <ChevronLeft />
      </NavButton>
      <NavButton to={next && problemUrl(next)} label="Next problem">
        <ChevronRight />
      </NavButton>
      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => execute('run')}
          disabled={busy}
          title="Run (Ctrl/⌘ + ')"
        >
          {busy && run?.mode === 'run' ? <Loader2 className="animate-spin" /> : <Play />} Run
        </Button>
        <Button
          size="sm"
          onClick={() => execute('submit')}
          disabled={busy}
          title="Submit (Ctrl/⌘ + Enter)"
        >
          {busy && run?.mode === 'submit' ? <Loader2 className="animate-spin" /> : <CloudUpload />}{' '}
          Submit
        </Button>
      </div>
    </div>
  )

  const sidePanelTabs = (
    <Tabs
      value={sidePanel}
      onValueChange={(v) => setSidePanel(v as SidePanel)}
      className="flex h-full flex-col gap-0"
    >
      <PanelTabs>
        <TabsTrigger value="description" className="flex-none">
          <FileText /> Description
        </TabsTrigger>
        <TabsTrigger value="solution" className="flex-none">
          <Lightbulb /> Solution
        </TabsTrigger>
        <TabsTrigger value="submissions" className="flex-none">
          <History /> Submissions
        </TabsTrigger>
      </PanelTabs>
      <TabsContent value="description" className="min-h-0 overflow-y-auto">
        <DescriptionPanel problem={problem} loaded={loaded} solved={solved} />
      </TabsContent>
      <TabsContent value="solution" className="min-h-0 overflow-y-auto">
        <EditorialPanel loaded={loaded} solved={solved} />
      </TabsContent>
      <TabsContent value="submissions" className="min-h-0 overflow-y-auto">
        <SubmissionsPanel
          problemKey={key}
          selectedId={submissionId}
          onSelect={setSubmissionId}
          onRestore={restoreSubmission}
        />
      </TabsContent>
    </Tabs>
  )

  const editorPanel = (
    <div className="flex h-full flex-col">
      <div className="flex h-10 shrink-0 items-center gap-2 border-b px-2">
        <select
          aria-label="Language"
          value={language}
          disabled={busy}
          onChange={(e) => switchLanguage(e.target.value as Language)}
          className="h-7 rounded-md border bg-background px-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {languages.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </select>
        <ResetCodeButton onConfirm={resetCode} />
      </div>
      <CodeEditor
        className="flex-1"
        value={code}
        language={language}
        onChange={editCode}
        onRun={() => execute('run')}
        onSubmit={() => execute('submit')}
      />
    </div>
  )

  const consolePanel = (
    <Tabs
      value={consoleTab}
      onValueChange={(v) => setConsoleTab(v as ConsoleTab)}
      className="flex h-full flex-col gap-0"
    >
      <PanelTabs>
        <TabsTrigger value="testcase" className="flex-none">
          <FlaskConical /> Testcase
        </TabsTrigger>
        <TabsTrigger value="result" className="flex-none">
          <Terminal /> Test Result
        </TabsTrigger>
      </PanelTabs>
      <TabsContent value="testcase" className="min-h-0 overflow-y-auto">
        <TestcasePanel
          names={names}
          cases={cases}
          onChange={setCases}
          selected={selectedCase}
          onSelect={setSelectedCase}
          error={caseError}
        />
      </TabsContent>
      <TabsContent value="result" className="min-h-0 overflow-y-auto">
        <ResultPanel key={runCount} run={run} names={names} />
      </TabsContent>
    </Tabs>
  )

  if (!desktop)
    return (
      <div>
        {toolbar}
        <section className="border-b">{sidePanelTabs}</section>
        <section className="h-[60vh] border-b">{editorPanel}</section>
        <section className="min-h-[40vh]">{consolePanel}</section>
      </div>
    )

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col">
      {toolbar}
      <Group orientation="horizontal" className="min-h-0 flex-1 bg-muted/40 p-2">
        <Panel id="description" defaultSize="45" minSize="25" className={panelClass}>
          {sidePanelTabs}
        </Panel>
        <ResizeHandle />
        <Panel id="workspace" minSize="30">
          <Group orientation="vertical" className="h-full">
            <Panel id="editor" defaultSize="62" minSize="20" className={panelClass}>
              {editorPanel}
            </Panel>
            <ResizeHandle vertical />
            <Panel id="console" minSize="15" className={panelClass}>
              {consolePanel}
            </Panel>
          </Group>
        </Panel>
      </Group>
    </div>
  )
}

const panelClass = 'h-full overflow-hidden rounded-lg border bg-background'

function PanelTabs({ children }: { children: ReactNode }) {
  return (
    <TabsList
      variant="line"
      className="h-10 w-full shrink-0 justify-start rounded-none border-b px-2"
    >
      {children}
    </TabsList>
  )
}

function ResizeHandle({ vertical = false }: { vertical?: boolean }) {
  return (
    <Separator
      className={cn(
        'group flex items-center justify-center outline-none',
        vertical ? 'h-2' : 'w-2',
      )}
    >
      <span
        className={cn(
          'rounded-full bg-border transition-colors group-hover:bg-primary/60 group-focus-visible:bg-primary group-data-[separator=active]:bg-primary',
          vertical ? 'h-0.5 w-10' : 'h-10 w-0.5',
        )}
      />
    </Separator>
  )
}

function NavButton({ to, label, children }: { to?: string; label: string; children: ReactNode }) {
  if (!to)
    return (
      <Button variant="ghost" size="icon-sm" disabled aria-label={label}>
        {children}
      </Button>
    )
  return (
    <Button variant="ghost" size="icon-sm" asChild>
      <Link to={to} aria-label={label}>
        {children}
      </Link>
    </Button>
  )
}

function ResetCodeButton({ onConfirm }: { onConfirm: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="ml-auto" aria-label="Reset code">
          <RotateCcw />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset your code?</AlertDialogTitle>
          <AlertDialogDescription>
            Your code in this language will be replaced with the starter code.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Reset</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
