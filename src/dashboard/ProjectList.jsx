import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Folder, ArrowRight, Clock, Trash2 } from "lucide-react";
import CreateProject from "./CreateProject";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get("/projects");
        setProjects(res.data || []);
      } catch (err) {
        console.error("Failed to fetch projects", err);
        // Optional: Set an error state if you want to show a message
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectCreated = (newProject) => {
    setProjects([newProject, ...projects]);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error("Failed to delete project", err);
      alert("Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-40 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <CreateProject onCreated={handleProjectCreated} />

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <Folder className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No projects yet. Create one above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate(`/projects/${project._id}`)}
              className="group cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <Folder className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this project?')) {
                        handleDelete(project._id);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                    title="Delete Project"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                {project.name}
              </h3>

              <div className="flex items-center gap-2 text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Clock className="w-3 h-3" />
                <span>View Analytics Dashboard</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
