import './Task.css'
import type { Task } from '../types'

type Props = {
  task: Task
  onToggle: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskDisplay({ task, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className={`task-row${task.completed ? ' is-completed' : ''}`}>
      <label className="task-label">
        <input className="task-checkbox" type="checkbox" aria-label={`${task.completed ? 'Снять отметку выполнения' : 'Отметить выполненной'}: ${task.text}`} checked={task.completed} onChange={() => onToggle(task.id)} />
        <span className={task.completed ? 'completed' : undefined}>{task.text}</span>
      </label>
      <div className="actions">
        <button className="button-subtle icon-button" type="button" aria-label={`Редактировать задачу: ${task.text}`} title="Редактировать задачу" onClick={() => onEdit(task.id)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="m15 5 4 4M4 20l4-1L20 7a2.83 2.83 0 0 0-4-4L4 15l-1 6Z" />
          </svg>
        </button>
        <button className="button-subtle button-danger icon-button" type="button" aria-label={`Удалить задачу: ${task.text}`} title="Удалить задачу" onClick={() => onDelete(task.id)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M3 6h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M5 6l1 14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1l1-14M10 10v7M14 10v7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
