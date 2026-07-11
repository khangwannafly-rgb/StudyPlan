import React from "react";
import TaskList from "../Components/TaskList";
import useLocalStorage from "../utils/useLocalStorage";
import { toast } from "sonner";
import EmptyState from "../Components/EmptyState";
import Card from "../Components/ui/Card";
import Badge from "../Components/ui/Badge";
import { Target } from "lucide-react";

export default function Today() {
  const [tasks, setTasks] = useLocalStorage("planner_tasks", []);
  const todayDate = new Date().toISOString().slice(0, 10);
  
  const todayTasksWithOriginalIndex = tasks
    .map((task, index) => ({ ...task, originalIndex: index }))
    .filter(task => task.date === todayDate);

  function removeTask(originalIndex) {
    const copy = [...tasks];
    copy.splice(originalIndex, 1);
    setTasks(copy);
  }

  function markDone(originalIndex) {
    const t = tasks[originalIndex];
    const logs = JSON.parse(localStorage.getItem("task_logs") || "[]");
    logs.push({ subject: t.subject, minutes: t.minutes, date: t.date });
    localStorage.setItem("task_logs", JSON.stringify(logs));
    removeTask(originalIndex);
    toast.success("Session logged for analytics! +100 XP 🌸");
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pb-10 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 tracking-tight font-heading flex items-center gap-2">
          <Target className="w-8 h-8 text-primary-500" /> Today's Focus
        </h1>
        {todayTasksWithOriginalIndex.length > 0 && (
          <Badge variant="primary" className="text-sm px-3 py-1">
            {todayTasksWithOriginalIndex.length} session{todayTasksWithOriginalIndex.length !== 1 ? 's' : ''} planned
          </Badge>
        )}
      </header>

      {todayTasksWithOriginalIndex.length === 0 ? (
        <EmptyState
          title="Nothing scheduled yet 🌸"
          description="Your schedule for today is completely clear. Let's plan some study sessions with Mochi to stay on track!"
          mochiPose="sleeping"
          actionLabel="Plan Study Sessions"
          linkTo="/"
        />
      ) : (
        <Card className="p-6">
          <TaskList 
            tasks={todayTasksWithOriginalIndex} 
            removeTask={(idx) => removeTask(todayTasksWithOriginalIndex[idx].originalIndex)} 
            markDone={(idx) => markDone(todayTasksWithOriginalIndex[idx].originalIndex)} 
          />
        </Card>
      )}
    </div>
  );
}
