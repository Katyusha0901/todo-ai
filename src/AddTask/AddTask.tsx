import './AddTask.css'
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
    <form onSubmit={handleSubmit} className="task-form add-task-form">
      <label htmlFor="new-task">Новая задача</label>
      <div className="controls">
        <input id="new-task" placeholder="Что нужно сделать?" autoComplete="off" value={text} onChange={(event) => setText(event.target.value)} />
        <button className="button-primary" type="submit" disabled={!text.trim()}><span aria-hidden="true">＋</span> Добавить</button>
      </div>
    </form>
  )
}
