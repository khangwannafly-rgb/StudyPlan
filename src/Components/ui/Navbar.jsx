import React, { memo } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function Navbar({ isOpen, onToggle }) {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="flex items-center justify-between glass rounded-[20px] px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-primary-400 flex items-center justify-center text-white text-sm shadow-md shadow-primary-500/20">
            🌸
          </div>
          <div>
            <span className="font-extrabold text-sm text-primary-600 dark:text-primary-400 font-heading">
              PinkSphere
            </span>
            <Sparkles className="inline w-3 h-3 text-primary-400 ml-1" />
          </div>
        </div>

        <motion.button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-sidebar"
          aria-expanded={isOpen}
          onClick={onToggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900/30 focus:outline-none focus:ring-2 focus:ring-primary-400/50"
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
      </div>
    </header>
  );
}

export default memo(Navbar);
