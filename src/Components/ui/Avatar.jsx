import React from "react";
import { cn } from "../../utils/cn";

export default function Avatar({
  src,
  alt = "Avatar",
  fallback = "?",
  className = "",
  size = "md",
  ...props
}) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-xl",
    xl: "w-24 h-24 text-2xl"
  };

  return (
    <div
      className={cn(
        "rounded-full border-2 border-primary-200 dark:border-primary-800 overflow-hidden flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-bold shrink-0 shadow-sm",
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
