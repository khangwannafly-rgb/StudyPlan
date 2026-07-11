import React from "react";
import { cn } from "../../utils/cn";

export default function Progress({
  value = 0,
  max = 100,
  className = "",
  size = "md",
  type = "horizontal",
  title = "",
  showPercentage = true,
  ...props
}) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  if (type === "circle") {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (pct / 100) * circumference;
    
    const circleSizes = {
      sm: { container: "w-16 h-16", font: "text-[10px]" },
      md: { container: "w-24 h-24", font: "text-sm" },
      lg: { container: "w-32 h-32", font: "text-base" }
    };

    return (
      <div className={cn("relative flex items-center justify-center select-none", circleSizes[size].container, className)} {...props}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-primary-100 dark:stroke-primary-900/20 fill-none"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-primary-500 fill-none transition-all duration-500 ease-out"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className={cn("absolute font-bold text-primary-700 dark:text-primary-300 font-heading", circleSizes[size].font)}>
          {showPercentage ? `${pct}%` : `${value}/${max}`}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full select-none", className)} {...props}>
      {(title || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-primary-700 dark:text-primary-300">
          <span>{title}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-primary-100 dark:bg-primary-900/20 rounded-full overflow-hidden">
        <div
          style={{ width: `${pct}%` }}
          className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500 ease-out"
        />
      </div>
    </div>
  );
}
