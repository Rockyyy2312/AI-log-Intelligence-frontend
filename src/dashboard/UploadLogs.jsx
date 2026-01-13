import { useState } from "react";
import api from "../api/api";

export default function UploadLogs({ projectId, onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("logfile", file);
    formData.append("projectId", projectId);

    setLoading(true);
    await api.post("/logs/upload", formData);
    setLoading(false);
    setFile(null);
    onUploaded();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
      <h3 className="font-semibold mb-2">Upload Logs</h3>

      <input
        type="file"
        accept=".log,.txt"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={upload}
        disabled={loading}
        className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
