import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  onClick,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-md shadow-primary-500/20 hover:shadow-primary-500/40 border border-transparent",
    secondary: "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/40 border border-primary-100 dark:border-primary-900/30",
    ghost: "bg-transparent text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/20 border border-transparent",
    outline: "bg-transparent border-2 border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/20",
    danger: "bg-gradient-to-r from-[#FF6B8A] to-[#FF85B3] text-white shadow-md shadow-red-500/10 hover:shadow-red-500/20 border border-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-[14px]",
    md: "px-5 py-2.5 text-sm rounded-[18px]",
    lg: "px-7 py-3.5 text-base rounded-[20px]"
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={disabled ? {} : { scale: 1.03, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
