import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import MLAnalysis from "./MLAnalysis";

export default function Dashboard() {
  const [project, setProject] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">AI Log Intelligence</h1>

          <div className="flex gap-3">
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
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
              className="mb-4 text-blue-500 underline"
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
