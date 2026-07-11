import React from "react";
import { cn } from "../../utils/cn";

export default function Input({
  className = "",
  type = "text",
  error = false,
  ...props
}) {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-4 py-3 rounded-[18px] text-sm bg-white/60 dark:bg-[#2D2230]/60 text-gray-800 dark:text-gray-100 border border-primary-100 dark:border-primary-900/30 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-500 transition-all duration-300",
        error && "border-red-400 focus:ring-red-400/50 focus:border-red-500",
        className
      )}
      {...props}
    />
  );
}
