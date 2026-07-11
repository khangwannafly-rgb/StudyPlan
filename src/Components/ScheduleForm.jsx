import React, { useState } from "react";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { BookOpen, Clock } from "lucide-react";
import { toast } from "sonner";

export default function ScheduleForm({ addTask }) {
  const [subject, setSubject] = useState("");
  const [minutes, setMinutes] = useState(25);
  const [date] = useState(() => new Date().toISOString().slice(0, 10));

  function submit(e) {
    e.preventDefault();
    if (!subject.trim()) {
      toast.error("Please add a subject name!");
      return;
    }
    addTask({ subject: subject.trim(), minutes: Number(minutes), date });
    setSubject("");
    setMinutes(25);
    toast.success("Study session added to today's plan! 🌸");
  }

  return (
    <Card className="p-6">
      <form onSubmit={submit} className="space-y-4">
        <h3 className="font-extrabold text-base text-primary-700 dark:text-primary-400 font-heading flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> What do you want to study today?
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Input 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              placeholder="e.g. DSA, DBMS, Machine Learning..." 
            />
          </div>
          
          <div className="flex items-center gap-2 bg-white/60 dark:bg-[#2D2230]/60 px-4 py-3 rounded-[18px] border border-primary-100 dark:border-primary-900/30 w-full sm:w-auto">
            <Clock className="w-4 h-4 text-primary-400" />
            <select 
              value={minutes} 
              onChange={(e) => setMinutes(e.target.value)}
              className="bg-transparent focus:outline-none font-bold text-primary-700 dark:text-primary-300 text-sm cursor-pointer"
            >
              <option value={15}>15 min</option>
              <option value={25}>25 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>60 min</option>
              <option value={90}>90 min</option>
            </select>
          </div>
          
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            Add to Today
          </Button>
        </div>
      </form>
    </Card>
  );
}
