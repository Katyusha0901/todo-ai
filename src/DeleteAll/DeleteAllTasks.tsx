import './DeleteAllTasks.css'
type Props = {
  disabled: boolean
  onDeleteAll: () => void
}

export default function DeleteAllTasks({ disabled, onDeleteAll }: Props) {
  return (
    <button className="button-subtle button-danger delete-all" type="button" disabled={disabled} onClick={onDeleteAll}>
      Удалить все задачи
    </button>
  )
}
