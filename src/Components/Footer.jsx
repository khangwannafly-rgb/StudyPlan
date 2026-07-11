import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-primary-100 dark:border-primary-900/30 mt-12 bg-white/20 dark:bg-black/10 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div>
          <h3 className="font-extrabold text-primary-600 dark:text-primary-400 font-heading">
            PinkSphere
          </h3>
          <p className="text-xs text-primary-400 dark:text-primary-500 font-bold uppercase tracking-wider">
            Plan. Focus. Grow.
          </p>
        </div>

        <p className="text-xs text-primary-600/70 dark:text-primary-400/70 font-semibold">
          © {new Date().getFullYear()} PinkSphere. Handcrafted for premium studying.
        </p>

        <div className="flex gap-5 text-xs font-bold text-primary-500/80 dark:text-primary-400/80">
          <a href="#" className="hover:text-primary-600 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-primary-600 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-primary-600 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}