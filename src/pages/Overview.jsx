import { useEffect, useState } from "react";
import api from "../api/api";
import { Activity, Layers, AlertCircle, CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react";

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoading(true);
        setError(null);

        // 🔹 Fetch projects
        const projectsRes = await api.get("/projects");
        const projects = projectsRes.data || [];

        let totalLogs = 0;
        let totalErrors = 0;
        let worstProject = null;
        let worstErrorRate = 0;

        // 🔹 Aggregate per project
        for (const project of projects) {
          try {
            const res = await api.get(`/logs/${project._id}/ml-full`);
            const summary = res.data?.summary;
            if (!summary) continue;

            totalLogs += summary.total_logs;
            totalErrors += summary.error_logs;

            const rate = summary.error_rate || 0;
            if (rate > worstErrorRate) {
              worstErrorRate = rate;
              worstProject = project.name;
            }
          } catch (e) {
            console.warn(`Failed to fetch stats for project ${project.name}`, e);
          }
        }

        const errorRate = totalLogs === 0 ? 0 : Math.round((totalErrors / totalLogs) * 100);

        let systemStatus = "Healthy";
        if (errorRate > 40) systemStatus = "Critical";
        else if (errorRate > 20) systemStatus = "Degraded";

        setStats({
          totalProjects: projects.length,
          totalLogs,
          totalErrors,
          errorRate,
          systemStatus,
          worstProject: worstProject || "N/A",
        });

      } catch (err) {
        console.error("Overview error:", err);
        setError("Failed to load system overview. Please try logging in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-900/30 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-red-700 dark:text-red-400">Unable to load data</h3>
        <p className="text-red-600 dark:text-red-300 mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // Safety fallback
  if (!stats) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          System Overview
        </h1>
        <p className="text-slate-500 mt-2">
          High-level metrics and health status across all projects.
        </p>
      </div>

      {/* ================= METRICS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={Layers}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Logs"
          value={stats.totalLogs.toLocaleString()}
          icon={Activity}
          color="bg-primary-500"
        />
        <StatCard
          title="Error Rate"
          value={`${stats.errorRate}%`}
          icon={TrendingUp}
          color={stats.errorRate > 20 ? "bg-red-500" : "bg-emerald-500"}
        />
      </div>

      {/* ================= STATUS SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard status={stats.systemStatus} />

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-lg text-red-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Total Errors</p>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalErrors.toLocaleString()}</h2>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Most Error-Prone</p>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate" title={stats.worstProject}>
            {stats.worstProject}
          </h2>
        </div>
      </div>

      {/* ================= INFO PANEL ================= */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Activity className="w-48 h-48" />
        </div>
        <h3 className="text-xl font-bold mb-4 relative z-10">Analytics Insights</h3>
        <ul className="space-y-3 relative z-10 text-slate-300">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
            <span>Monitor system reliability in real-time.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
            <span>Identify and debug high-risk projects immediately.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
            <span>Track log volume growth trends.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-card-hover group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2 group-hover:text-primary-600 transition-colors">{value}</h2>
        </div>
        <div className={`p-3 rounded-xl ${color} text-white shadow-lg shadow-${color}/30`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

function StatusCard({ status }) {
  const isHealthy = status === "Healthy";
  const isCritical = status === "Critical";

  const colorClass = isHealthy ? "text-emerald-500 bg-emerald-50 border-emerald-200" : isCritical ? "text-red-500 bg-red-50 border-red-200" : "text-amber-500 bg-amber-50 border-amber-200";
  const Icon = isHealthy ? CheckCircle2 : AlertTriangle;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${isHealthy ? "bg-emerald-100 text-emerald-600" : isCritical ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"}`}>
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-sm font-medium text-slate-500">System Status</p>
      </div>
      <h2 className={`text-3xl font-bold ${isHealthy ? "text-emerald-600" : isCritical ? "text-red-600" : "text-amber-600"}`}>
        {status}
      </h2>
    </div>
  );
}
