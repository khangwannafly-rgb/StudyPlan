import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";
import Navbar from "./Components/ui/Navbar";
import PageTransition from "./Components/ui/PageTransition";
import SakuraLoading from "./Components/ui/SakuraLoading";

const Home = lazy(() => import("./pages/Home"));
const Planner = lazy(() => import("./pages/Planner"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Timer = lazy(() => import("./pages/Timer"));
const Today = lazy(() => import("./pages/Today"));
const Goals = lazy(() => import("./pages/Goals"));
const Settings = lazy(() => import("./pages/Settings"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <SakuraLoading text="Loading..." />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/today" element={<Today />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    }

    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    function handleBreakpointChange(event) {
      if (event.matches) {
        setIsSidebarOpen(false);
      }
    }

    if (mediaQuery.matches) {
      setIsSidebarOpen(false);
    }

    mediaQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-primary-50 dark:bg-[#201822] text-gray-900 dark:text-gray-100 transition-colors duration-500 font-sans">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-200/30 dark:bg-primary-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-300/20 dark:bg-primary-800/10 rounded-full blur-3xl" />
      </div>

      <Navbar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((open) => !open)}
      />

      <div className="max-w-[1400px] mx-auto p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="hidden md:block sticky top-8 self-start">
          <Sidebar modalId="profileModalDesktop" />
        </div>

        <div
          className={`md:hidden fixed inset-0 z-40 bg-[#201822]/40 backdrop-blur-sm transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden="true"
          onClick={closeSidebar}
        />

        <div
          id="mobile-sidebar"
          className={`md:hidden fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] overflow-y-auto px-4 pb-6 pt-24 transition-transform duration-300 ease-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!isSidebarOpen}
          inert={!isSidebarOpen ? true : undefined}
        >
          <Sidebar onNavigate={closeSidebar} modalId="profileModalMobile" />
        </div>

        <main className="flex-1 flex flex-col min-h-[90vh] pt-16 md:pt-0">
          <AnimatedRoutes />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
