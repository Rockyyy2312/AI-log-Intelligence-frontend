import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import MLAnalysis from "./MLAnalysis";

export default function Dashboard() {
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">AI Log Intelligence</h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </header>

        {!project ? (
          <ProjectList onSelect={setProject} />
        ) : (
          <>
            <button
              onClick={() => setProject(null)}
              className="mb-4 text-blue-600 underline"
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
