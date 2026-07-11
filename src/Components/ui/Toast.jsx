import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "bg-white/95 dark:bg-[#2D2230]/95 backdrop-blur-xl border border-primary-100 dark:border-primary-900/30 text-gray-800 dark:text-gray-100 font-sans shadow-lg shadow-primary-500/10 rounded-[18px]",
          title: "font-bold text-sm font-heading",
          description: "text-xs text-gray-500 dark:text-gray-400",
          success: "border-success/30",
          error: "border-danger/30",
        },
      }}
      richColors
      closeButton
    />
  );
}
