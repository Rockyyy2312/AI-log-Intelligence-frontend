import { useEffect, useState } from "react";
import api from "../api/api";
import { motion } from "framer-motion";

export default function ProjectList({ onSelect }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => {
      if (res.data.length === 0) {
        api.post("/projects", { name: "Demo AI Log Project" }).then(() => {
          api.get("/projects").then((r) => setProjects(r.data));
        });
      } else {
        setProjects(res.data);
      }
    });
  }, []);

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
            <p className="text-sm text-gray-500 mt-1">Log monitoring enabled</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
