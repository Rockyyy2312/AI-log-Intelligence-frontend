import { useEffect, useState } from "react";
import api from "../api/api";

export default function ProjectList({ onSelect }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  if (projects.length === 0) {
    return <p>No projects found</p>;
  }

  return (
    <div style={{ display: "grid", gap: "12px" }}>
      <h3>Select a Project</h3>

      {projects.map((project) => (
        <div
          key={project._id}
          onClick={() => onSelect(project)}
          style={{
            padding: "16px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            cursor: "pointer",
            background: "#fafafa",
          }}
        >
          <strong>{project.name}</strong>
        </div>
      ))}
    </div>
  );
}
