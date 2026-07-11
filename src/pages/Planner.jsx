import React from "react";
import ScheduleForm from "../Components/ScheduleForm";
import TaskList from "../Components/TaskList";
import useLocalStorage from "../utils/useLocalStorage";
import Card from "../Components/ui/Card";
import { toast } from "sonner";
import { BookOpen } from "lucide-react";

export default function Planner() {
  const [tasks, setTasks] = useLocalStorage("planner_tasks", []);

  function addTask(task) {
    setTasks([...tasks, task]);
  }
  function removeTask(idx) {
    const copy = tasks.slice();
    copy.splice(idx, 1);
    setTasks(copy);
  }
  function markDone(idx) {
    const t = tasks[idx];
    const logs = JSON.parse(localStorage.getItem("task_logs") || "[]");
    logs.push({ subject: t.subject, minutes: t.minutes, date: t.date });
    localStorage.setItem("task_logs", JSON.stringify(logs));
    removeTask(idx);
    toast.success("Session logged for analytics! +100 XP 🌸");
  }

  return (
    <div className="max-w-5xl mx-auto pb-10 space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading flex items-center gap-3">
          <BookOpen className="w-9 h-9 text-primary-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
            Study Planner
          </span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
          Plan your sessions and track progress with Mochi 📚
        </p>
      </header>

      <ScheduleForm addTask={addTask} />

      <Card>
        <h3 className="font-extrabold text-lg text-primary-700 dark:text-primary-400 font-heading mb-4">
          All Planned Sessions
        </h3>
        <TaskList tasks={tasks} removeTask={removeTask} markDone={markDone} />
      </Card>
    </div>
  );
}
