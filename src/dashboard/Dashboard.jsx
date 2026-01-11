import { useState } from "react";
import ProjectList from "./ProjectList";
import MLAnalysis from "./MLAnalysis";

export default function Dashboard() {
  const [project, setProject] = useState(null);

  return (
    <div>
      <h1>AI Log Intelligence Dashboard</h1>

      {!project ? (
        <ProjectList onSelect={setProject} />
      ) : (
        <MLAnalysis project={project} />
      )}
    </div>
  );
}
