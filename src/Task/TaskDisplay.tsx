import type { Task } from '../types'

type Props = {
  task: Task
  onToggle: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskDisplay({ task, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className="task-row">
      <label className="task-label">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <span className={task.completed ? 'completed' : undefined}>{task.text}</span>
      </label>
      <div className="actions">
        <button type="button" onClick={() => onEdit(task.id)}>Редактировать</button>
        <button type="button" onClick={() => onDelete(task.id)}>Удалить</button>
      </div>
    </div>
  )
}
