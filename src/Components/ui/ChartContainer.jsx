import React, { memo } from "react";
import { cn } from "../../utils/cn";

function ChartContainer({ children, className = "", title, subtitle }) {
  return (
    <div className={cn("w-full", className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h4 className="font-extrabold text-sm text-primary-700 dark:text-primary-400 font-heading">
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      )}
      <div className="rounded-[18px] overflow-hidden">{children}</div>
    </div>
  );
}

export default memo(ChartContainer);
