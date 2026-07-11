import React, { useState } from "react";
import useLocalStorage from "../utils/useLocalStorage";
import { CheckCircle2, Circle, Trash2, Target, Plus, Heart } from "lucide-react";
import { toast } from "sonner";
import EmptyState from "../Components/EmptyState";
import Card from "../Components/ui/Card";
import Input from "../Components/ui/Input";
import Button from "../Components/ui/Button";
import Badge from "../Components/ui/Badge";

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
      createdAt: new Date().toISOString(),
    };
    setGoals([newGoal, ...goals]);
    setTitle("");
    setTargetDate("");
    toast.success("Goal added! Mochi is cheering for you 🌸");
  };

  const toggleGoal = (id) => {
    setGoals(
      goals.map((g) =>
        g.id === id ? { ...g, isCompleted: !g.isCompleted } : g
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
    toast.success("Goal removed");
  };

  const activeGoals = goals.filter((g) => !g.isCompleted);
  const completedGoals = goals.filter((g) => g.isCompleted);

  return (
    <div className="max-w-5xl mx-auto pb-10 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 tracking-tight font-heading flex items-center gap-2">
          <Heart className="w-8 h-8 text-primary-500" />
          Your Goals
        </h1>
        {activeGoals.length > 0 && (
          <Badge variant="primary" className="text-sm px-3 py-1">
            {activeGoals.length} active
          </Badge>
        )}
      </header>

      <Card className="p-6">
        <h2 className="text-lg font-extrabold text-primary-700 dark:text-primary-400 font-heading mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Set a New Goal
        </h2>
        <form onSubmit={handleAddGoal} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Finish Calculus Course"
            className="flex-1"
          />
          <Input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="sm:w-48"
          />
          <Button type="submit" variant="primary" className="shrink-0">
            <Plus className="w-4 h-4 mr-1.5" />
            Add Goal
          </Button>
        </form>
      </Card>

      {goals.length === 0 ? (
        <EmptyState
          mochiPose="thinking"
          title="No goals yet 🌸"
          description="Set long-term milestones to stay motivated. Mochi believes every big achievement starts with a single goal!"
        />
      ) : (
        <div className="space-y-6">
          {activeGoals.length > 0 && (
            <Card className="p-0 overflow-hidden">
              <div className="p-4 bg-primary-50/50 dark:bg-primary-900/10 border-b border-primary-100 dark:border-primary-900/20">
                <h3 className="font-extrabold text-primary-700 dark:text-primary-400 font-heading text-sm">
                  In Progress
                </h3>
              </div>
              <ul className="divide-y divide-primary-100/30 dark:divide-primary-900/20">
                {activeGoals.map((goal) => (
                  <li
                    key={goal.id}
                    className="p-4 flex items-center justify-between group hover:bg-primary-50/30 dark:hover:bg-primary-950/20 transition-colors rounded-none"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <button
                        onClick={() => toggleGoal(goal.id)}
                        className="text-primary-300 hover:text-primary-500 transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-full"
                        aria-label={`Mark ${goal.title} as complete`}
                      >
                        <Circle className="w-6 h-6" />
                      </button>
                      <div>
                        <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                          {goal.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                          Target:{" "}
                          {new Date(goal.targetDate).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-gray-400 hover:text-danger p-2 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-danger rounded-full"
                      aria-label={`Delete ${goal.title}`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {completedGoals.length > 0 && (
            <Card className="p-0 overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
              <div className="p-4 bg-success/10 border-b border-success/20">
                <h3 className="font-extrabold text-success dark:text-success font-heading text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed — Mochi is proud! 🎉
                </h3>
              </div>
              <ul className="divide-y divide-primary-100/30 dark:divide-primary-900/20">
                {completedGoals.map((goal) => (
                  <li
                    key={goal.id}
                    className="p-4 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <button
                        onClick={() => toggleGoal(goal.id)}
                        className="text-primary-500 hover:text-gray-400 transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-full"
                        aria-label={`Mark ${goal.title} as incomplete`}
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </button>
                      <div>
                        <p className="font-medium text-gray-500 line-through text-sm">
                          {goal.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Target:{" "}
                          {new Date(goal.targetDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-gray-400 hover:text-danger p-2 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 rounded-full"
                      aria-label={`Delete ${goal.title}`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
