// utils for calculating weekly hours, subject distribution, heatmap data
import { addDays, subDays, format } from "date-fns";

export function getLastNDays(n = 30) {
  const arr = [];
  for (let i = n - 1; i >= 0; i--) {
    arr.push(format(subDays(new Date(), i), "yyyy-MM-dd"));
  }
  return arr;
}

// example: tasks log contains { date: '2025-10-12', minutes: 25, subject: 'Math' }
export function weeklyHours(tasksLog = []) {
  // return last 7 days total minutes -> hours
  const days = getLastNDays(7);
  return days.map((d) => {
    const totalMins = tasksLog.filter((t) => t.date === d).reduce((s, x) => s + (x.minutes || 0), 0);
    return { date: d, hours: +(totalMins / 60).toFixed(2) };
  });
}

export function subjectDistribution(tasksLog = []) {
  const map = {};
  tasksLog.forEach((t) => {
    const s = t.subject || "Other";
    map[s] = (map[s] || 0) + (t.minutes || 0);
  });
  const total = Object.values(map).reduce((a, b) => a + b, 0) || 1;
  return Object.keys(map).map((k) => ({ subject: k, percent: Math.round((map[k] / total) * 100) }));
}

export function heatmapValues(tasksLog = []) {
  // returns [{ date:'yyyy-MM-dd', count }]
  // count: 0 = no activity, 1 = light, 2 = medium, 3 = good, 4+ = intense
  const days = getLastNDays(90);
  return days.map((d) => {
    const minutes = tasksLog.filter((t) => t.date === d).reduce((s, x) => s + (x.minutes || 0), 0);
    return { date: d, count: minutes > 0 ? Math.ceil(minutes / 15) : 0 };
  });
}

export function thisWeekStats(tasksLog = []) {
  const days = getLastNDays(7);
  const weeklyLogs = tasksLog.filter((t) => days.includes(t.date));
  
  const totalMinutes = weeklyLogs.reduce((s, t) => s + (t.minutes || 0), 0);
  const longestSession = weeklyLogs.reduce((max, t) => Math.max(max, t.minutes || 0), 0);
  
  const subjectMap = {};
  weeklyLogs.forEach((t) => {
    const s = t.subject || "Other";
    subjectMap[s] = (subjectMap[s] || 0) + (t.minutes || 0);
  });
  
  let mostStudied = "None";
  let maxTime = 0;
  Object.entries(subjectMap).forEach(([subj, time]) => {
    if (time > maxTime) {
      maxTime = time;
      mostStudied = subj;
    }
  });

  return {
    totalMinutes,
    longestSession,
    mostStudied,
    completedSessions: weeklyLogs.length
  };
}
