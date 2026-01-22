import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import MLAnalysis from "./MLAnalysis";
import Sidebar from "../layout/Sidebar";
import { motion } from "framer-motion";
import socket from "../socket";

export default function Dashboard() {
  const [project, setProject] = useState(null);
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  // 🔴 NEW: used to force refresh of stats
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  // 🔴 NEW: listen for backend "logs-updated" event
  useEffect(() => {
    if (!project) return;

    socket.connect();
    socket.emit("join-project", project._id);

    socket.on("logs-updated", () => {
      // 🔥 force MLAnalysis to re-fetch stats
      setRefreshKey((prev) => prev + 1);
    });

    return () => {
      socket.off("logs-updated");
      socket.disconnect();
    };
  }, [project]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDark(isDark);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      className="flex min-h-screen
      bg-gradient-to-br from-gray-100 to-indigo-100
      dark:from-gray-900 dark:to-gray-800"
    >
      <Sidebar onLogout={logout} />

      <motion.main
        className="flex-1 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            Dashboard
          </h1>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
          >
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
        </header>

        {!project ? (
          <ProjectList onSelect={setProject} />
        ) : (
          <>
            <button
              onClick={() => setProject(null)}
              className="mb-6 text-indigo-600 underline"
            >
              ← Change Project
            </button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* 🔴 PASS refreshKey */}
              <MLAnalysis project={project} refreshKey={refreshKey} />
            </motion.div>
          </>
        )}
      </motion.main>
    </div>
  );
}
