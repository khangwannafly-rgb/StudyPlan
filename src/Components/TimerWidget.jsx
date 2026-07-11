import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, ChevronDown, Coffee } from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Mochi from "./ui/Mochi";

export default function TimerWidget({
  onComplete,
  defaultMinutes = 25,
  defaultSubject = "General",
}) {
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [seconds, setSeconds] = useState(defaultMinutes * 60);
  const [running, setRunning] = useState(false);
  const [subject, setSubject] = useState(defaultSubject);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (seconds <= 0 && running) {
      setRunning(false);

      const audio = new Audio("/sounds/complete.mp3");
      audio.play().catch(() => {});

      onComplete(minutes, subject);

      setSeconds(minutes * 60);
    }
  }, [seconds, running, minutes, subject, onComplete]);

  // Calculate circular progress dash offset
  const totalSeconds = minutes * 60;
  const progress = (seconds / totalSeconds);
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  function format(s) {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  return (
    <Card className="flex flex-col items-center p-8 md:p-12 max-w-2xl mx-auto shadow-2xl relative overflow-hidden select-none">
      
      {/* Background soft pink glow */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary-200/20 dark:bg-primary-950/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-200/20 dark:bg-primary-950/20 blur-3xl rounded-full"></div>

      {/* Subject Selector */}
      <div className="mb-6 w-full flex justify-center group relative z-10">
        <div className="relative inline-block bg-primary-50 dark:bg-[#201822] px-6 py-2.5 rounded-full border border-primary-100 dark:border-primary-900/40">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="appearance-none text-base font-extrabold bg-transparent text-center focus:outline-none text-primary-600 dark:text-primary-400 cursor-pointer pr-5 tracking-wide font-heading"
          >
            <option>General</option>
            <option>DSA</option>
            <option>Math</option>
            <option>ML</option>
          </select>
          <ChevronDown className="w-4 h-4 text-primary-400 absolute right-4 top-3.5 pointer-events-none opacity-80" />
        </div>
      </div>

      {/* Session Presets */}
      <div className="flex gap-2.5 mb-8 flex-wrap justify-center relative z-10">
        {[25, 50, 90].map((preset) => (
          <button
            key={preset}
            onClick={() => {
              setRunning(false);
              setMinutes(preset);
              setSeconds(preset * 60);
            }}
            className={`px-4 py-2 rounded-full transition-all duration-300 text-xs font-bold uppercase tracking-wider cursor-pointer border ${
              minutes === preset
                ? "bg-gradient-to-r from-primary-500 to-primary-400 text-white border-transparent shadow-md shadow-primary-500/20"
                : "bg-white/50 dark:bg-[#2D2230]/50 border-primary-100 dark:border-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/20"
            }`}
          >
            {preset} min
          </button>
        ))}
      </div>

      {/* Grid of Mascot and Timer */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full mb-8 relative z-10">
        
        {/* Animated Circular Timer Display */}
        <div className="relative flex items-center justify-center w-[270px] h-[270px] shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 270 270">
            {/* Background circle */}
            <circle
              cx="135"
              cy="135"
              r={radius}
              className="stroke-primary-50 dark:stroke-primary-950 fill-none"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="135"
              cy="135"
              r={radius}
              className="stroke-primary-500 fill-none transition-all duration-300 ease-out"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Timer text inside the circle */}
          <div className="absolute text-5xl font-extrabold tracking-tighter tabular-nums text-gray-800 dark:text-gray-100 font-heading">
            {format(seconds)}
          </div>
        </div>

        {/* Mascot Mochi State Indicator */}
        <div className="flex flex-col items-center justify-center text-center space-y-2 bg-primary-50/20 dark:bg-primary-900/10 p-4 rounded-[24px] border border-primary-100/30 dark:border-primary-900/10 w-full max-w-[200px]">
          <Mochi pose={running ? "studying" : "happy"} size={110} />
          <div>
            <p className="text-xs font-bold text-primary-700 dark:text-primary-400 font-heading">
              {running ? "Deep Focus Mode!" : "Let's start study!"}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
              {running ? "Mochi is studying with you..." : "Mochi is waiting for you"}
            </p>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 w-full justify-center relative z-10">
        <Button
          onClick={() => setRunning(!running)}
          variant={running ? "secondary" : "primary"}
          className="w-36 py-3.5"
        >
          {running ? "Pause" : "Start"}
        </Button>

        <Button
          onClick={() => {
            setRunning(false);
            setSeconds(minutes * 60);
          }}
          variant="outline"
          className="w-36 py-3.5"
        >
          Reset
        </Button>
      </div>
    </Card>
  );
}