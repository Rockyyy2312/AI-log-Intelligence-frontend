import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/projects").then((res) => {
      setProjects(res.data || []);
    });
  }, []);

  if (projects.length === 0) {
    return <p className="text-gray-500">No projects found</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {projects.map((project) => (
        <div
          key={project._id}
          onClick={() => navigate(`/projects/${project._id}`)}
          className="cursor-pointer bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:scale-[1.02] transition"
        >
          <h3 className="font-semibold">{project.name}</h3>
          <p className="text-sm text-gray-500">Click to view analytics</p>
        </div>
      ))}
    </div>
  );
}
