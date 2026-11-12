type Props = {
  disabled: boolean
  onDeleteAll: () => void
}

export default function DeleteAllTasks({ disabled, onDeleteAll }: Props) {
  return (
    <button type="button" disabled={disabled} onClick={onDeleteAll}>
      Удалить все задачи
    </button>
  )
}
