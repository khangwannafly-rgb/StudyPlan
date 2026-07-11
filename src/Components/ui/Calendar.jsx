import React, { memo, useMemo } from "react";
import { cn } from "../../utils/cn";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({
  weekDays,
  todayDate,
  hasLogsForDate,
  onDayClick,
  className = "",
}) {
  const days = useMemo(() => {
    if (weekDays) return weekDays;
    const result = [];
    const today = new Date();
    const currentDay = today.getDay();
    const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + distanceToMonday);
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      result.push(d);
    }
    return result;
  }, [weekDays]);

  const today = todayDate || new Date().toISOString().slice(0, 10);

  return (
    <div className={cn("grid grid-cols-7 gap-2", className)}>
      {days.map((day, idx) => {
        const dateStr = day.toISOString().slice(0, 10);
        const isToday = dateStr === today;
        const hasStudied = hasLogsForDate ? hasLogsForDate(dateStr) : false;

        return (
          <button
            key={idx}
            type="button"
            onClick={() => onDayClick?.(day, dateStr)}
            className="text-center space-y-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-xl p-1"
          >
            <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">
              {DAY_NAMES[day.getDay()]}
            </div>
            <div
              className={cn(
                "w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                isToday &&
                  "bg-primary-500 text-white shadow-md shadow-primary-500/35 ring-2 ring-primary-300 pink-glow",
                !isToday &&
                  hasStudied &&
                  "bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200/50 group-hover:scale-105",
                !isToday &&
                  !hasStudied &&
                  "bg-gray-50 dark:bg-[#201822]/60 text-gray-500 dark:text-gray-400 border border-transparent group-hover:bg-primary-50 dark:group-hover:bg-primary-950/20"
              )}
            >
              {day.getDate()}
            </div>
            {hasStudied && (
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mx-auto" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default memo(Calendar);
