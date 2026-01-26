import { useEffect, useState } from "react";
import api from "../api/api";
import { motion } from "framer-motion";
import { UploadCloud, FileText, CheckCircle, AlertCircle } from "lucide-react";

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
        console.error("Failed to load projects");
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
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("success");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Upload Logs</h1>
        <p className="text-slate-500 mt-2">
          Manually upload log files for immediate analysis.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: FORM */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select Project</label>
              <select
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                <option value="">-- Choose a project --</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Log File</label>
              <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <input
                  type="file"
                  accept=".log,.txt"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  {file ? (
                    <FileText className="w-10 h-10 text-primary-500 mb-2" />
                  ) : (
                    <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
                  )}
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {file ? file.name : "Click to browse or drag file here"}
                  </p>
                  {!file && <p className="text-xs text-slate-400 mt-1">.log or .txt files only</p>}
                </div>
              </div>
            </div>

            <button
              onClick={handleUpload}
              disabled={loading || !file || !projectId}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-3 text-lg"
            >
              {loading ? "Uploading..." : "Start Upload"}
            </button>
          </div>

          {/* RIGHT: STATUS */}
          <div className="border-l border-slate-200 dark:border-slate-800 pl-8 flex flex-col justify-center">
            {message === "success" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Upload Successful!</h3>
                <p className="text-slate-500 mt-2">Your logs are now being processed by the ML engine.</p>
              </div>
            )}
            {message === "error" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Upload Failed</h3>
                <p className="text-slate-500 mt-2">Something went wrong. Please check your connection and try again.</p>
              </div>
            )}
            {!message && (
              <div className="text-center text-slate-400">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <p>Upload status will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
