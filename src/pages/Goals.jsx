import React, { useState } from "react";
import useLocalStorage from "../utils/useLocalStorage";
import { CheckCircle2, Circle, Trash2, Target, Plus } from "lucide-react";
import { toast } from "sonner";
import EmptyState from "../Components/EmptyState";

export default function Goals() {
  const [goals, setGoals] = useLocalStorage("planner_goals", []);
  const [title, setTitle] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!title.trim() || !targetDate) {
      toast.error("Please provide both a title and a target date.");
      return;
    }
    const newGoal = {
      id: Date.now().toString(),
      title: title.trim(),
      targetDate,
      isCompleted: false,
      createdAt: new Date().toISOString()
    };
    setGoals([newGoal, ...goals]);
    setTitle("");
    setTargetDate("");
    toast.success("Goal added!");
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(g => 
      g.id === id ? { ...g, isCompleted: !g.isCompleted } : g
    ));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
    toast.success("Goal removed");
  };

  const activeGoals = goals.filter(g => !g.isCompleted);
  const completedGoals = goals.filter(g => g.isCompleted);

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400 tracking-tight flex items-center gap-2">
          <Target className="w-8 h-8" />
          Your Goals
        </h1>
        {activeGoals.length > 0 && (
          <span className="bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 px-3 py-1 rounded-full font-semibold text-sm">
            {activeGoals.length} active
          </span>
        )}
      </header>

      {/* Add Goal Form */}
      <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Set a New Goal</h2>
        <form onSubmit={handleAddGoal} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Finish Calculus Course"
            className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          />
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="sm:w-48 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          />
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl px-6 py-3 flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <Plus className="w-5 h-5" />
            Add Goal
          </button>
        </form>
      </div>

      {goals.length === 0 ? (
        <EmptyState
          icon={
            <Target className="w-10 h-10 text-primary-500 dark:text-primary-400 opacity-80" />
          }
          title="No goals yet"
          description="Set long-term milestones to stay motivated. Add your first goal above."
        />
      ) : (
        <div className="space-y-6">
          {/* Active Goals */}
          {activeGoals.length > 0 && (
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">In Progress</h3>
              </div>
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {activeGoals.map(goal => (
                  <li key={goal.id} className="p-4 flex items-center justify-between group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <button onClick={() => toggleGoal(goal.id)} className="text-gray-300 hover:text-primary-500 transition-colors shrink-0">
                        <Circle className="w-6 h-6" />
                      </button>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{goal.title}</p>
                        <p className="text-xs text-gray-500 mt-1">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteGoal(goal.id)} className="text-gray-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Completed Goals */}
          {completedGoals.length > 0 && (
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Completed</h3>
              </div>
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {completedGoals.map(goal => (
                  <li key={goal.id} className="p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4 flex-1">
                      <button onClick={() => toggleGoal(goal.id)} className="text-primary-500 hover:text-gray-400 transition-colors shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </button>
                      <div>
                        <p className="font-medium text-gray-500 line-through">{goal.title}</p>
                        <p className="text-xs text-gray-400 mt-1">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteGoal(goal.id)} className="text-gray-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
