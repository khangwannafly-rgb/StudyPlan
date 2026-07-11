import React from "react";
import { cn } from "../../utils/cn";

export default function Modal({
  id,
  children,
  className = "",
  ...props
}) {
  return (
    <dialog
      id={id}
      className={cn(
        "rounded-[28px] p-8 backdrop-blur-xl bg-white/95 dark:bg-[#2D2230]/95 border border-white/40 dark:border-white/10 shadow-2xl text-gray-900 dark:text-gray-100 max-w-sm w-full m-auto backdrop:bg-black/35 backdrop:backdrop-blur-sm focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </dialog>
  );
}
