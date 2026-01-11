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
      <h3 className="text-xl font-semibold mb-4">Select a Project</h3>

      <div className="grid grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => onSelect(project)}
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
          >
            <strong>{project.name}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
