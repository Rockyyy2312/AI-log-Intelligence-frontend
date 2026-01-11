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
    <div>
      <h3>Your Projects</h3>
      <ul>
        {projects.map((project) => (
          <li key={project._id} style={{ marginBottom: "8px" }}>
            <button onClick={() => onSelect(project)}>{project.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
