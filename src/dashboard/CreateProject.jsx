import { useState } from "react";
import api from "../api/api";
import { Plus } from "lucide-react";

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
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800 mb-8">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Create New Project</h3>

      <div className="flex gap-3">
        <input
          className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none dark:bg-slate-800 dark:text-white transition-all"
          placeholder="Enter project name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && createProject()}
        />

        <button
          onClick={createProject}
          disabled={loading || !name.trim()}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}
