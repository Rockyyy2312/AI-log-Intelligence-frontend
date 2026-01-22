import { useEffect, useState } from "react";
import api from "../api/api";
import { motion } from "framer-motion";

export default function ProjectList({ onSelect }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading projects…</p>;
  }

  if (projects.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
        <h3 className="text-lg font-semibold mb-2">No Projects Found</h3>
        <p className="text-gray-500">
          Create a project to start monitoring logs.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-xl font-semibold mb-4">Select a Project</h3>

      <div className="grid grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            onClick={() => onSelect(project)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow cursor-pointer"
          >
            <strong>{project.name}</strong>
            <p className="text-sm text-gray-500 mt-1">
              Click to view analytics
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
