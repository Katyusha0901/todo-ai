import { useEffect, useState } from "react";
import AddTask from "./AddTask/AddTask";
import DeleteAllTasks from "./DeleteAll/DeleteAllTasks";
import TaskDisplay from "./Task/TaskDisplay";
import TaskEditing from "./Task/TaskEditing";
import type { Task } from "./types";

const STORAGE_KEY = "todo-ai.tasks";

function loadTasks(): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Task[]) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.warn("Не удалось сохранить задачи в localStorage.", error);
    }
  }, [tasks]);

  function addTask(text: string) {
    const trimmedText = text.trim();
    if (!trimmedText) return;
    const task: Task = {
      id: crypto.randomUUID(),
      text: trimmedText,
      completed: false,
    };
    setTasks((previous) => [...previous, task]);
  }

  function toggleTask(id: string) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id: string) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
    setEditingTaskId((previous) => (previous === id ? null : previous));
  }

  function saveTask(id: string, text: string) {
    const trimmedText = text.trim();
    if (!trimmedText) return;
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, text: trimmedText } : task,
      ),
    );
    setEditingTaskId(null);
  }

  function deleteAllTasks() {
    setTasks(() => []);
    setEditingTaskId(null);
  }

  return (
    <main>
      <h1>Список задач</h1>
      <AddTask onAdd={addTask} />
      {tasks.length === 0 ? (
        <p>Задач пока нет.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              {editingTaskId === task.id ? (
                <TaskEditing
                  task={task}
                  onSave={saveTask}
                  onCancel={() => setEditingTaskId(null)}
                />
              ) : (
                <TaskDisplay
                  task={task}
                  onToggle={toggleTask}
                  onEdit={setEditingTaskId}
                  onDelete={deleteTask}
                />
              )}
            </li>
          ))}
        </ul>
      )}
      <DeleteAllTasks
        disabled={tasks.length === 0}
        onDeleteAll={deleteAllTasks}
      />
    </main>
  );
}
