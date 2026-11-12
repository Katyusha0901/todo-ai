import "./App.css";
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
  const completedCount = tasks.filter((task) => task.completed).length;

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
    setTasks([]);
    setEditingTaskId(null);
  }

  return (
    <main>
      <header className="page-header">
        <span className="eyebrow">Меньше суеты · больше ясности</span>
        <h1>
          Список задач
          <span className="heading-dot" aria-hidden="true">
            .
          </span>
        </h1>
        <p className="page-description">
          Освободите мысли. Начните с одной задачи.
        </p>
      </header>
      <section className="workspace" aria-label="Управление задачами">
        <AddTask onAdd={addTask} />
        <div className="list-heading">
          <h2>Ваши задачи</h2>
          <span aria-live="polite" aria-atomic="true">
            Активных: {tasks.length - completedCount} · Выполнено:{" "}
            {completedCount}
          </span>
        </div>
        {tasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">
              ✓
            </span>
            <h3>Здесь начинается порядок</h3>
            <p>
              Пока задач нет. Добавьте первую в поле выше —
              <br className="desktop-break" /> и двигайтесь в своём темпе.
            </p>
          </div>
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
        <footer className="list-footer">
          <DeleteAllTasks
            disabled={tasks.length === 0}
            onDeleteAll={deleteAllTasks}
          />
        </footer>
      </section>
      <p className="page-note">Маленькие шаги тоже ведут вперёд.</p>
    </main>
  );
}
