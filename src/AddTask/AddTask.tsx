import { useState } from 'react'
import type { SubmitEvent } from 'react'

type Props = {
  onAdd: (text: string) => void
}

export default function AddTask({ onAdd }: Props) {
  const [text, setText] = useState('')

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedText = text.trim()
    if (!trimmedText) return
    onAdd(trimmedText)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label htmlFor="new-task">Новая задача</label>
      <div className="controls">
        <input id="new-task" value={text} onChange={(event) => setText(event.target.value)} />
        <button type="submit" disabled={!text.trim()}>Добавить</button>
      </div>
    </form>
  )
}
