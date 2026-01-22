import { useEffect, useState } from "react";
import api from "../api/api";
import { motion } from "framer-motion";

export default function UploadLogs() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    loadProjects();
  }, []);

  const handleUpload = async () => {
    if (!projectId || !file) {
      setMessage("Please select a project and a log file.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("projectId", projectId);
      formData.append("logfile", file);

      await api.post("/logs/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Log file uploaded and analyzed successfully.");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-3xl"
    >
      <h1 className="text-2xl font-bold mb-2">Upload Logs</h1>
      <p className="text-gray-500 mb-6">
        Upload a <code>.log</code> file to analyze system behavior.
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
        <div>
          <label className="block text-sm mb-1">Project</label>
          <select
            className="w-full p-2 rounded border dark:bg-gray-900"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select a project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Log file</label>
          <input
            type="file"
            accept=".log,.txt"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Logs"}
        </button>

        {message && <p className="text-sm text-gray-500">{message}</p>}
      </div>
    </motion.div>
  );
}
