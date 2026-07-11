import React from "react";
import { cn } from "../../utils/cn";

export default function Badge({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const baseStyles = "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide border";
  
  const variants = {
    primary: "bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 border-primary-100 dark:border-primary-900/20",
    success: "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border-green-100 dark:border-green-900/20",
    warning: "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300 border-yellow-100 dark:border-yellow-900/20",
    danger: "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-red-100 dark:border-red-900/20"
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
