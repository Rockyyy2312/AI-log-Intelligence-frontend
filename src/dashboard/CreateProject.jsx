import { useState } from "react";
import api from "../api/api";

export default function CreateProject({ onCreated }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const createProject = async () => {
    if (!name.trim()) return;

    setLoading(true);
    const res = await api.post("/projects", { name });
    setLoading(false);
    setName("");
    onCreated(res.data);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
      <h3 className="font-semibold mb-2">Create New Project</h3>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={createProject}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}
