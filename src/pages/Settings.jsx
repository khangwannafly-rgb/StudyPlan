import React from "react";
import EmptyState from "../Components/EmptyState";
import Card from "../Components/ui/Card";
import { useTheme } from "../contexts/ThemeContext";
import { Flower, Moon, Sun, Sparkles } from "lucide-react";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-5xl mx-auto pb-10 space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 tracking-tight font-heading flex items-center gap-2">
          <Flower className="w-8 h-8" />
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
          Customize your PinkSphere experience
        </p>
      </header>

      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500">
              {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Appearance</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Switch between light and pastel dark mode
              </p>
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-400/50 ${
              theme === "dark" ? "bg-primary-500" : "bg-primary-200"
            }`}
            aria-label="Toggle dark mode"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform shadow-sm ${
                theme === "dark" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="border-t border-primary-100 dark:border-primary-900/20 pt-6">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-primary-400" />
            <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Profile</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Edit your name, college, and avatar from the profile card in the sidebar.
          </p>
        </div>
      </Card>

      <EmptyState
        mochiPose="happy"
        title="More settings coming soon 🌸"
        description="Mochi is working on new features! For now, manage your profile from the sidebar and toggle dark mode above."
      />
    </div>
  );
}
