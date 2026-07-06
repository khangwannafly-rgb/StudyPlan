import React from "react";
import TaskList from "../Components/TaskList";
import useLocalStorage from "../utils/useLocalStorage";
import { toast } from "sonner";

export default function Today() {
  const [tasks, setTasks] = useLocalStorage("planner_tasks", []);
  const todayDate = new Date().toISOString().slice(0, 10);
  
  // Filter for today's tasks and map them to their original index for deletion/completion
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
    toast.success("Session logged for analytics!");
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400 tracking-tight">
          Today's Focus
        </h1>
        {todayTasksWithOriginalIndex.length > 0 && (
          <span className="bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300 px-3 py-1 rounded-full font-semibold text-sm">
            {todayTasksWithOriginalIndex.length} session{todayTasksWithOriginalIndex.length !== 1 ? 's' : ''} planned
          </span>
        )}
      </header>

      {todayTasksWithOriginalIndex.length === 0 ? (
        <div className="bg-white dark:bg-[#111827] p-12 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center transition-colors duration-500 min-h-[400px]">
          <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-teal-500 dark:text-teal-400 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Nothing scheduled yet</h2>
          <p className="text-gray-500 max-w-md">Your schedule for today is completely clear. Head over to the Home dashboard to plan your upcoming study sessions.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-500">
          <TaskList 
            tasks={todayTasksWithOriginalIndex} 
            // We pass the mapped original index to the removeTask/markDone functions
            removeTask={(idx) => removeTask(todayTasksWithOriginalIndex[idx].originalIndex)} 
            markDone={(idx) => markDone(todayTasksWithOriginalIndex[idx].originalIndex)} 
          />
        </div>
      )}
    </div>
  );
}
