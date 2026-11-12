import './Task.css'
import { useState } from "react";
import type { SubmitEvent } from "react";
import type { Task } from "../types";

type Props = {
  task: Task;
  onSave: (id: string, text: string) => void;
  onCancel: () => void;
};

export default function TaskEditing({ task, onSave, onCancel }: Props) {
  const [text, setText] = useState(task.text);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) onSave(task.id, trimmedText);
  }

  return (
    <form className="task-form editing-form" onSubmit={handleSubmit}>
      <label htmlFor={`edit-${task.id}`}>Текст задачи</label>
      <div className="controls">
        <input
          id={`edit-${task.id}`}
          autoFocus
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              onCancel();
            }
          }}
        />
        <button className="button-primary" type="submit" disabled={!text.trim()}>
          Сохранить
        </button>
        <button type="button" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  );
}
