import React from "react";

const dotColors = [
  "bg-teal-500",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-blue-400",
  "bg-red-400"
];

export default function TaskList({ tasks, removeTask, markDone }) {
  return (
    <div className="space-y-3">
      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-gray-400 dark:text-gray-500 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
          <span className="font-medium text-sm">No sessions planned yet</span>
        </div>
      )}
      {tasks.map((t, i) => (
        <div key={i} className="group flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${dotColors[i % dotColors.length]}`}></div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{t.subject}</h4>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {t.minutes} min
            </div>
            
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={()=>markDone(i)} className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300" title="Mark Done">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </button>
              <button onClick={()=>removeTask(i)} className="text-red-500 hover:text-red-600 dark:hover:text-red-400" title="Delete">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            {/* 3 dots icon for unhovered state to match design */}
            <div className="group-hover:hidden text-gray-400 px-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </div>
          </div>
        </div>
      ))}
      {tasks.length > 0 && (
        <button className="w-full py-3 mt-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Add another session
        </button>
      )}
    </div>
  );
}
