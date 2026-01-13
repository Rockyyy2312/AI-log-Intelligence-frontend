import { useEffect, useState } from "react";
import api from "../api/api";
import { motion } from "framer-motion";

export default function ProjectList({ onSelect }) {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [uploadingProjectId, setUploadingProjectId] = useState(null);
  const [file, setFile] = useState(null);

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    if (res.data.length === 0) {
      await api.post("/projects", { name: "Demo AI Log Project" });
      const r = await api.get("/projects");
      setProjects(r.data);
    } else {
      setProjects(res.data);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create project from UI
  const createProject = async () => {
    if (!newProject.trim()) return;
    await api.post("/projects", { name: newProject });
    setNewProject("");
    fetchProjects();
  };

  // Upload logs from UI
  const uploadLogs = async (projectId) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("logfile", file);
    formData.append("projectId", projectId);

    setUploadingProjectId(projectId);
    await api.post("/logs/upload", formData);
    setUploadingProjectId(null);
    setFile(null);

    alert("Logs uploaded successfully");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* CREATE PROJECT */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-2">Create New Project</h3>
        <div className="flex gap-2">
          <input
            className="flex-1 p-2 border rounded dark:bg-gray-900"
            placeholder="Project name"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
          />
          <button
            onClick={createProject}
            className="bg-indigo-600 text-white px-4 rounded"
          >
            Create
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Your Projects</h3>

      <div className="grid grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
          >
            {/* SELECT PROJECT */}
            <div
              onClick={() => onSelect(project)}
              className="cursor-pointer mb-2"
            >
              <strong>{project.name}</strong>
              <p className="text-sm text-gray-500">Click to view analytics</p>
            </div>

            {/* UPLOAD LOGS */}
            <div className="mt-3">
              <input
                type="file"
                accept=".log,.txt"
                onChange={(e) => setFile(e.target.files[0])}
                className="text-sm"
              />

              <button
                onClick={() => uploadLogs(project._id)}
                disabled={uploadingProjectId === project._id}
                className="mt-2 w-full bg-green-600 text-white py-1 rounded"
              >
                {uploadingProjectId === project._id
                  ? "Uploading..."
                  : "Upload Logs"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
