import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import MLAnalysis from "./MLAnalysis";

export default function Dashboard() {
  const [project, setProject] = useState(null);
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDark(isDark);
  };

  return (
    <div
      className="min-h-screen
      bg-gradient-to-br from-gray-100 to-indigo-100
      dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            AI Log Intelligence
          </h1>

          <div className="flex gap-3">
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg
                bg-indigo-600 text-white"
            >
              {dark ? "☀ Light" : "🌙 Dark"}
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="px-4 py-2 rounded-lg
                bg-red-500 text-white"
            >
              Logout
            </button>
          </div>
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
            <MLAnalysis project={project} />
          </>
        )}
      </div>
    </div>
  );
}
