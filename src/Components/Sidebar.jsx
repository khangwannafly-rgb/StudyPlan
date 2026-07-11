import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import useProfile from "../utils/useProfile";
import { Book, Target, Coffee, Sparkles, Heart, Flower, Moon, Sun, ChevronDown } from "lucide-react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Avatar from "./ui/Avatar";

export default function Sidebar({ onNavigate, modalId = "profileModal" }) {
  const { theme, setTheme } = useTheme();
  const { profile, setProfile } = useProfile();
  const { name, college, avatar } = profile;

  const navItems = [
    { path: "/", label: "Home", icon: Book },
    { path: "/today", label: "Today", icon: Target },
    { path: "/timer", label: "Focus", icon: Coffee },
    { path: "/dashboard", label: "Progress", icon: Sparkles },
    { path: "/goals", label: "Goals", icon: Heart },
    { path: "/settings", label: "Settings", icon: Flower },
  ];

  return (
    <aside className="w-64 flex flex-col min-h-[90vh] bg-gradient-to-b from-white/80 via-primary-50/60 to-primary-100/40 dark:from-[#2D2230]/90 dark:via-[#2D2230]/75 dark:to-primary-900/20 border border-primary-100 dark:border-primary-900/30 rounded-[30px] p-5 shadow-[0_8px_32px_0_rgba(255,95,162,0.1)] backdrop-blur-xl transition-all duration-300">
      
      {/* LOGO SECTION */}
      <div className="flex items-center gap-3 px-2 mb-8 select-none">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-primary-400 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-primary-500/20">
          🌸
        </div>
        <div>
          <h1 className="font-extrabold text-xl text-primary-600 dark:text-primary-400 tracking-tight font-heading">
            PinkSphere
          </h1>
          <p className="text-[10px] text-primary-400 dark:text-primary-500 font-bold tracking-widest uppercase mt-0.5">
            Plan. Focus. Grow.
          </p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-2 mb-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-[18px] font-bold transition-all duration-300 flex items-center gap-3 text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-md shadow-primary-500/25"
                    : "text-primary-700/80 dark:text-primary-300/80 hover:bg-primary-50 dark:hover:bg-primary-900/25 hover:text-primary-600 dark:hover:text-primary-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-primary-50 dark:bg-primary-900/30 text-primary-500"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* CUTE MOCHI MOTIVATIONAL QUOTE CARD */}
      <div className="bg-primary-50/50 dark:bg-primary-900/10 p-4 rounded-[24px] mb-auto border border-primary-100 dark:border-primary-900/20 text-center">
        <p className="text-primary-700 dark:text-primary-300 font-bold text-xs leading-relaxed uppercase tracking-wider mb-1 font-heading">
          Mochi's Reminder 🍡
        </p>
        <p className="text-xs text-primary-600/90 dark:text-primary-400/90 font-medium italic">
          "Small steps, consistent days, big results!"
        </p>
      </div>

      {/* BOTTOM PROFILE & THEME SECTION */}
      <div className="mt-8 space-y-4">
        {/* Profile Card */}
        <div 
          onClick={() => document.getElementById(modalId).showModal()}
          className="flex items-center justify-between p-2 rounded-[20px] hover:bg-primary-50 dark:hover:bg-primary-900/20 cursor-pointer transition-colors border border-transparent hover:border-primary-100 dark:hover:border-primary-900/20"
        >
          <div className="flex items-center gap-3">
            <Avatar src={avatar} fallback={name ? name[0] : "?"} size="md" />
            <div className="overflow-hidden">
              <div className="font-bold text-sm text-primary-950 dark:text-primary-50 truncate">
                {name || "User"}
              </div>
              <div className="text-[11px] text-primary-400 dark:text-primary-500 font-bold truncate">
                {college || "Add College"}
              </div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-primary-400" />
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between px-2 select-none">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-500 dark:text-primary-400">
            {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            Dark mode
          </div>
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer border border-transparent focus:outline-none ${
              theme === "dark" ? "bg-primary-500" : "bg-primary-200"
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
              theme === "dark" ? "translate-x-5" : "translate-x-0.5"
            }`} />
          </button>
        </div>
      </div>

      {/* PROFILE EDIT MODAL */}
      <Modal id={modalId}>
        <form method="dialog" className="space-y-5">
          <h3 className="text-xl font-extrabold text-center text-primary-600 dark:text-primary-400 font-heading">
            Edit Profile 🌸
          </h3>
          <div className="space-y-1">
            <label className="text-xs font-bold text-primary-400 uppercase tracking-wider">Name</label>
            <Input 
              type="text" 
              placeholder="Your Name" 
              defaultValue={name} 
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-primary-400 uppercase tracking-wider">College</label>
            <Input 
              type="text" 
              placeholder="College" 
              defaultValue={college} 
              onChange={(e) => setProfile((p) => ({ ...p, college: e.target.value }))} 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-primary-400 uppercase tracking-wider block mb-1">Avatar</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => { 
                const file = e.target.files[0]; 
                if (file) {
                  const reader = new FileReader(); 
                  reader.onload = () => setProfile((p) => ({ ...p, avatar: reader.result })); 
                  reader.readAsDataURL(file); 
                }
              }} 
              className="w-full text-xs text-primary-600 dark:text-primary-400 cursor-pointer file:mr-3 file:py-2 file:px-3 file:rounded-[12px] file:border-0 file:text-xs file:font-bold file:bg-primary-50 dark:file:bg-primary-950/40 file:text-primary-700 dark:file:text-primary-300 hover:file:bg-primary-100" 
            />
          </div>
          <Button type="submit" variant="primary" className="w-full mt-4">
            Save Changes
          </Button>
        </form>
      </Modal>
    </aside>
  );
}
