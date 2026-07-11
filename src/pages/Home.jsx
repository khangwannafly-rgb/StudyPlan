import React from "react";
import { Link } from "react-router-dom";
import ScheduleForm from "../Components/ScheduleForm";
import TaskList from "../Components/TaskList";
import useLocalStorage from "../utils/useLocalStorage";
import useProfile from "../utils/useProfile";
import { thisWeekStats } from "../utils/calcStats";
import { toast } from "sonner";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import Progress from "../Components/ui/Progress";
import Mochi from "../Components/ui/Mochi";
import Calendar from "../Components/ui/Calendar";
import { Flame, Trophy, Calendar as CalendarIcon, Clock, Sparkles, Star, ChevronRight, Award } from "lucide-react";

export default function Home() {
  const { profile } = useProfile();
  const [tasks, setTasks] = useLocalStorage("planner_tasks", []);
  
  const logs = JSON.parse(localStorage.getItem("task_logs") || "[]");
  const stats = thisWeekStats(logs);

  const todayDate = new Date().toISOString().slice(0, 10);

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
    const newLogs = [...logs, { subject: t.subject, minutes: t.minutes, date: t.date }];
    localStorage.setItem("task_logs", JSON.stringify(newLogs));
    removeTask(idx);
    toast.success("Session logged for analytics! +100 XP 🌸");
  }

  // Calculate study streak
  const getStreak = (logs) => {
    if (!logs || logs.length === 0) return 0;
    const dates = [...new Set(logs.map(l => l.date))].sort().reverse();
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    
    if (dates[0] !== today && dates[0] !== yesterday) return 0;
    
    let streak = 0;
    let currentCheck = new Date(dates[0]);
    
    for (let i = 0; i < dates.length; i++) {
      const d = new Date(dates[i]);
      const diffTime = Math.abs(currentCheck - d);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0 || diffDays === 1) {
        streak++;
        currentCheck = d;
      } else {
        break;
      }
    }
    return streak;
  };

  const streak = getStreak(logs);

  // Calculate XP (10 XP per minute studied)
  const totalMinutesStudied = logs.reduce((sum, log) => sum + (log.minutes || 0), 0);
  const totalXP = totalMinutesStudied * 10;
  const currentLevel = Math.floor(totalXP / 500) + 1;
  const xpInCurrentLevel = totalXP % 500;

  // Format total minutes
  const formatTime = (mins) => {
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  // Greeting
  const currentHour = new Date().getHours();
  let greeting = "Good evening 🌸";
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning 🌸";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon 🌸";
  }

  // Quotes
  const quotes = [
    "Mochi believes in you! You can do this! 🌸",
    "Slow progress is still progress! Keep going 🍡",
    "Focus is a muscle, keep training it! ☕",
    "Make today your masterpiece! ✨",
    "You are capable of amazing things! 🌸"
  ];
  // Stable random quote index based on the day of the month
  const quoteIndex = new Date().getDate() % quotes.length;
  const dailyQuote = quotes[quoteIndex];

  // Daily target progress: e.g. target of 50 mins per day
  const todayStudyMins = logs
    .filter(l => l.date === todayDate)
    .reduce((sum, l) => sum + (l.minutes || 0), 0);

  // Calendar logic (Current week)
  const getWeekDays = () => {
    const days = [];
    const today = new Date();
    const currentDay = today.getDay();
    const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + distanceToMonday);
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push(d);
    }
    return days;
  };
  const weekDays = getWeekDays();

  // Check if a date has study logs
  const hasLogsForDate = (dateStr) => {
    return logs.some(l => l.date === dateStr);
  };

  // Recent activity logs (last 3 entries)
  const recentLogs = [...logs].reverse().slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto pb-10 space-y-8 font-sans">
      
      {/* Premium Hero Header */}
      <header className="relative bg-gradient-to-r from-primary-200 via-primary-50 to-white dark:from-[#2D2230] dark:via-[#201822] dark:to-[#2D2230] rounded-[30px] border border-primary-100 dark:border-primary-900/30 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_0_rgba(255,95,162,0.06)] overflow-hidden">
        
        {/* Sparkles effect in bg */}
        <div className="absolute top-4 right-1/4 opacity-30 animate-pulse pointer-events-none">
          <Sparkles className="w-6 h-6 text-primary-400" />
        </div>
        
        <div className="flex-1 space-y-3 text-center md:text-left z-10">
          <h2 className="text-xl text-primary-600 dark:text-primary-400 font-extrabold tracking-wide uppercase font-heading">
            {greeting}
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight font-heading">
            {profile.name || "User"} <span className="inline-block animate-bounce">✨</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium text-base md:max-w-md">
            "{dailyQuote}"
          </p>
          
          {/* Level / XP display */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <span className="bg-primary-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md shadow-primary-500/20">
              <Trophy className="w-3.5 h-3.5" />
              Level {currentLevel}
            </span>
            <span className="bg-white/95 dark:bg-[#201822] border border-primary-100 dark:border-primary-900/40 text-primary-600 dark:text-primary-400 text-xs font-bold px-3 py-1.5 rounded-full">
              {totalXP} Total XP
            </span>
          </div>
        </div>

        {/* Mascot Mochi Cheering */}
        <div className="relative shrink-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-primary-200/40 dark:bg-primary-900/20 blur-2xl rounded-full scale-90"></div>
          <Mochi pose="cheering" size={160} />
        </div>
      </header>

      {/* Stats Quick Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Study Streak */}
        <Card hoverEffect className="flex flex-col justify-between p-5 text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-orange-500 mb-3">
            <Flame className="w-5 h-5" fill="currentColor" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 font-heading">
              {streak} Days
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mt-1">
              Study Streak
            </p>
          </div>
        </Card>

        {/* Level XP Bar */}
        <Card hoverEffect className="flex flex-col justify-between p-5 text-center col-span-1">
          <div className="w-10 h-10 mx-auto rounded-full bg-yellow-100 dark:bg-yellow-950/40 flex items-center justify-center text-yellow-500 mb-3">
            <Star className="w-5 h-5" fill="currentColor" />
          </div>
          <div className="space-y-1">
            <Progress value={xpInCurrentLevel} max={500} showPercentage={false} />
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
              {xpInCurrentLevel}/500 XP to Lvl {currentLevel + 1}
            </p>
          </div>
        </Card>

        {/* Weekly Completed Sessions */}
        <Card hoverEffect className="flex flex-col justify-between p-5 text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center text-green-500 mb-3">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 font-heading">
              {stats.completedSessions}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mt-1">
              Sessions Done
            </p>
          </div>
        </Card>

        {/* Total Weekly Hours */}
        <Card hoverEffect className="flex flex-col justify-between p-5 text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-primary-100 dark:bg-primary-950/40 flex items-center justify-center text-primary-500 mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 font-heading">
              {formatTime(stats.totalMinutes)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mt-1">
              This Week
            </p>
          </div>
        </Card>
      </div>

      {/* Main Schedule Form */}
      <ScheduleForm addTask={addTask} />

      {/* Core Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Focus Plan */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h3 className="font-extrabold text-lg text-primary-700 dark:text-primary-400 font-heading">
                  Today's Focus 🎯
                </h3>
                <span className="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs px-2.5 py-1 rounded-full font-bold">
                  {tasks.length} planned
                </span>
              </div>
              <Link to="/today" className="text-primary-500 hover:text-primary-600 text-xs font-bold flex items-center gap-0.5">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            
            <TaskList tasks={tasks} removeTask={removeTask} markDone={markDone} />
          </div>
        </Card>

        {/* Progress Circle & Focus Prompt Side panel */}
        <div className="space-y-6 flex flex-col justify-between h-full">
          {/* Progress circle panel */}
          <Card className="flex flex-col items-center justify-center text-center p-6 flex-1">
            <h4 className="font-bold text-sm text-primary-700 dark:text-primary-400 font-heading mb-4">
              Daily Target Progress
            </h4>
            <Progress 
              type="circle" 
              value={todayStudyMins} 
              max={60} 
              size="lg" 
              showPercentage={true} 
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-4 max-w-[200px]">
              {todayStudyMins >= 60 
                ? "Daily goal achieved! Awesome work! 🎉" 
                : `${60 - todayStudyMins} mins more to reach your daily study goal.`}
            </p>
          </Card>

          {/* Start Focus Session banner */}
          <Card className="bg-gradient-to-br from-primary-500 to-primary-400 text-white p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-4 -bottom-4 opacity-15">
              <Clock className="w-28 h-28" />
            </div>
            <div className="relative z-10 space-y-3">
              <h4 className="font-extrabold text-xl font-heading">Ready to study?</h4>
              <p className="text-xs text-white/90 font-medium leading-relaxed max-w-[200px]">
                Eliminate distractions, focus with Mochi, and log your hours.
              </p>
              <Link to="/timer" className="block pt-2">
                <Button variant="secondary" className="w-full bg-white text-primary-600 hover:bg-primary-50">
                  Start Focus Timer
                </Button>
              </Link>
            </div>
          </Card>
        </div>

      </div>

      {/* Calendar Preview & Recent Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Custom Mini Calendar Week Preview */}
        <Card className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <CalendarIcon className="w-5 h-5 text-primary-500" />
            <h3 className="font-extrabold text-lg text-primary-700 dark:text-primary-400 font-heading">
              Weekly Overview
            </h3>
          </div>
          
          <Calendar
            weekDays={weekDays}
            todayDate={todayDate}
            hasLogsForDate={hasLogsForDate}
          />
        </Card>

        {/* Recent Activity */}
        <Card>
          <h3 className="font-extrabold text-lg text-primary-700 dark:text-primary-400 font-heading mb-6">
            Recent Activity 📜
          </h3>
          
          {recentLogs.length === 0 ? (
            <div className="text-center py-6 text-gray-400 dark:text-gray-500 text-xs font-semibold">
              No sessions logged yet.
            </div>
          ) : (
            <ul className="space-y-4">
              {recentLogs.map((log, idx) => (
                <li key={idx} className="flex items-center justify-between border-b border-primary-100/20 dark:border-primary-900/10 pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-bold text-sm text-gray-800 dark:text-gray-200">
                      {log.subject}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {new Date(log.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                    </p>
                  </div>
                  <span className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-extrabold px-2.5 py-1 rounded-full border border-primary-100/30">
                    +{log.minutes}m
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

      </div>

    </div>
  );
}
