import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 transition-colors duration-500">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200">
          <div className="w-5 h-5 rounded-full bg-teal-800 flex items-center justify-center text-white text-[10px]">S</div>
          StudySphere
        </div>
        <p>© {new Date().getFullYear()} StudySphere. Crafted with <span className="text-red-500">♥</span> for better productivity.</p>
        <div className="flex gap-4 mt-2">
          <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
