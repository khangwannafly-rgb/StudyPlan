import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export default function Card({
  children,
  className = "",
  hoverEffect = false,
  animate = true,
  ...props
}) {
  const CardComponent = animate ? motion.div : "div";
  
  const animationProps = animate ? {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
    ...(hoverEffect ? {
      whileHover: { y: -4, scale: 1.01, boxShadow: "0 12px 40px 0 rgba(255,95,162,0.12)" }
    } : {})
  } : {};

  return (
    <CardComponent
      className={cn(
        "bg-white/75 dark:bg-[#2D2230]/75 backdrop-blur-[20px] border border-white/40 dark:border-white/10 rounded-[24px] shadow-[0_8px_32px_0_rgba(255,95,162,0.06)] p-6 transition-all duration-300",
        className
      )}
      {...animationProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
}
