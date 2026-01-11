import { useState } from "react";
import ProjectList from "./ProjectList";
import MLAnalysis from "./MLAnalysis";

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Log Intelligence Dashboard</h1>

      {!selectedProject ? (
        <ProjectList onSelect={setSelectedProject} />
      ) : (
        <>
          <button
            onClick={() => setSelectedProject(null)}
            style={{ marginBottom: "15px" }}
          >
            ← Back to Projects
          </button>

          <MLAnalysis project={selectedProject} />
        </>
      )}
    </div>
  );
}
