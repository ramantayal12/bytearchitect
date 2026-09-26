import { Lightbulb } from 'lucide-react'
import { isMultiSelect, toggleSelection } from '../quiz.logic'
import type { QuizQuestion } from '../quiz.types'
import { OptionItem } from './OptionItem'

interface QuestionViewProps {
  question: QuizQuestion
  number: number
  selected: number[]
  revealed: boolean
  onChange: (selected: number[]) => void
}

export function QuestionView({
  question,
  number,
  selected,
  revealed,
  onChange,
}: QuestionViewProps) {
  const multi = isMultiSelect(question)
  return (
    <fieldset className="grid gap-3">
      <legend className="mb-3 font-medium">
        <span className="text-muted-foreground">{number}. </span>
        {question.prompt}
        {multi && (
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            (Select all that apply)
          </span>
        )}
      </legend>
      <ul className="grid gap-2" role={multi ? 'group' : 'radiogroup'}>
        {question.options.map((option, i) => (
          <OptionItem
            key={i}
            option={option}
            index={i}
            multi={multi}
            selected={selected.includes(i)}
            revealed={revealed}
            onToggle={() => onChange(toggleSelection(selected, i, multi))}
          />
        ))}
      </ul>
      {revealed && question.explanation && (
        <p className="flex gap-2 rounded-md bg-muted p-3 text-sm text-muted-foreground">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>{question.explanation}</span>
        </p>
      )}
    </fieldset>
  )
}
