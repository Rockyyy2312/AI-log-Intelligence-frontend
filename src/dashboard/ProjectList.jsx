import { useEffect, useState } from "react";
import api from "../api/api";

export default function ProjectList({ onSelect }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <div>
      <h3>Your Projects</h3>
      {projects.map((p) => (
        <button key={p._id} onClick={() => onSelect(p)}>
          {p.name}
        </button>
      ))}
    </div>
  );
}
