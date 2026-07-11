import React, { useState } from "react";
import { Check, Trash2, Clock, MoreVertical, AlertTriangle } from "lucide-react";
import Button from "./ui/Button";

const dotColors = [
  "bg-[#FF5FA2]",
  "bg-[#FF7DB6]",
  "bg-[#FFC7DD]",
  "bg-[#FF94C8]",
  "bg-[#FFEAF5]"
];

function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" 
      onClick={onCancel}
    >
      <div 
        className="bg-white/95 dark:bg-[#2D2230]/95 rounded-[28px] p-6 shadow-2xl border border-primary-100 dark:border-primary-900/30 max-w-sm w-full animate-in fade-in zoom-in-95 duration-200" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center text-red-500 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-gray-900 dark:text-white font-heading text-lg">
              Delete Session?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1 leading-relaxed">
              This session will be removed from your today's schedule. This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onCancel} size="sm">
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} size="sm">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function TaskList({ tasks, removeTask, markDone }) {
  const [deleteIndex, setDeleteIndex] = useState(null);
  return (
    <div className="space-y-3">
      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-primary-400 dark:text-primary-600 border-2 border-dashed border-primary-100 dark:border-primary-900/20 rounded-[20px] bg-primary-50/10 select-none">
          <span className="font-bold text-sm tracking-wide">No study sessions planned yet</span>
        </div>
      )}
      {tasks.map((t, i) => (
        <div 
          key={i} 
          className="group flex items-center justify-between p-4 bg-white/50 dark:bg-[#2D2230]/40 rounded-[20px] border border-primary-100/50 dark:border-primary-900/20 hover:bg-primary-50/30 dark:hover:bg-primary-950/20 hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-full ${dotColors[i % dotColors.length]} border border-white dark:border-[#2D2230] shadow-sm`}></div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm tracking-wide">
              {t.subject}
            </h4>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-primary-600 dark:text-primary-400 font-bold bg-primary-50 dark:bg-primary-950/40 px-2.5 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              {t.minutes} min
            </div>
            
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => markDone(i)} 
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 bg-primary-50 dark:bg-primary-900/20 p-1.5 rounded-full cursor-pointer hover:scale-110 transition-transform" 
                title="Mark Done"
              >
                <Check className="w-4 h-4" strokeWidth={3} />
              </button>
              <button 
                onClick={() => setDeleteIndex(i)} 
                className="text-red-500 hover:text-red-600 dark:hover:text-red-400 bg-red-50 dark:bg-red-950/20 p-1.5 rounded-full cursor-pointer hover:scale-110 transition-transform" 
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            {/* 3 dots icon for unhovered state to match design */}
            <div className="group-hover:hidden text-primary-300 dark:text-primary-700 px-1">
              <MoreVertical className="w-4 h-4" />
            </div>
          </div>
        </div>
      ))}
      {tasks.length > 0 && (
        <button className="w-full py-3.5 mt-2 text-xs font-bold uppercase tracking-wider text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 border-2 border-dashed border-primary-200 dark:border-primary-800 rounded-[20px] hover:bg-primary-50/20 dark:hover:bg-primary-950/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
          + Add another session
        </button>
      )}

      {deleteIndex !== null && (
        <ConfirmDeleteModal
          onConfirm={() => {
            removeTask(deleteIndex);
            setDeleteIndex(null);
          }}
          onCancel={() => setDeleteIndex(null)}
        />
      )}
    </div>
  );
}
