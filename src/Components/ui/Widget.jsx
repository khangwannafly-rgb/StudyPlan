import React, { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

function Widget({
  title,
  subtitle,
  icon: Icon,
  children,
  className = "",
  hoverEffect = true,
  action,
}) {
  return (
    <motion.div
      className={cn(
        "glass rounded-[24px] p-6 transition-all duration-300",
        className
      )}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={
        hoverEffect
          ? { y: -4, scale: 1.01, boxShadow: "0 12px 40px 0 rgba(255,95,162,0.12)" }
          : undefined
      }
    >
      {(title || Icon) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500">
                <Icon className="w-4 h-4" />
              </div>
            )}
            <div>
              {title && (
                <h3 className="font-extrabold text-base text-primary-700 dark:text-primary-400 font-heading">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </motion.div>
  );
}

export default memo(Widget);
