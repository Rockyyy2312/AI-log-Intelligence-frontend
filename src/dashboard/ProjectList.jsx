import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { motion } from "framer-motion";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  if (projects.length === 0) {
    return (
      <p className="text-gray-500">No projects found. Create one to begin.</p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          onClick={() => navigate(`/projects/${project._id}`)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.03 }}
          className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="text-sm text-gray-500 mt-1">Click to view analytics</p>
        </motion.div>
      ))}
    </div>
  );
}
