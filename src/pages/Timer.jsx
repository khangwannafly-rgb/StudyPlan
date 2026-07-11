import React from "react";
import TimerWidget from "../Components/TimerWidget";
import { toast } from "sonner";
import { Coffee } from "lucide-react";

export default function Timer() {
  function onComplete(minutes, subject) {
    const logs = JSON.parse(localStorage.getItem("task_logs") || "[]");

    logs.push({
      subject,
      minutes,
      date: new Date().toISOString().slice(0, 10),
    });

    localStorage.setItem("task_logs", JSON.stringify(logs));

    toast.success(`Session logged: ${minutes} mins for ${subject} 🌸`);
  }

  return (
    <div className="max-w-5xl mx-auto pb-10 space-y-6">
      <header className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary-600 dark:text-primary-400 tracking-tight font-heading flex items-center justify-center md:justify-start gap-2">
          <Coffee className="w-8 h-8" />
          Focus Timer
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
          Deep focus mode with Mochi — eliminate distractions ☕
        </p>
      </header>

      <TimerWidget onComplete={onComplete} />
    </div>
  );
}
