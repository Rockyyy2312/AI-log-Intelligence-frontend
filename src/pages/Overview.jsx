import { useEffect, useState } from "react";
import api from "../api/api";

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoading(true);

        // 🔹 Fetch projects
        const projectsRes = await api.get("/projects");
        const projects = projectsRes.data || [];

        let totalLogs = 0;
        let totalErrors = 0;
        let worstProject = null;
        let worstErrorRate = 0;

        // 🔹 Aggregate per project
        for (const project of projects) {
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
        }

        const errorRate =
          totalLogs === 0 ? 0 : Math.round((totalErrors / totalLogs) * 100);

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

        setLoading(false);
      } catch (err) {
        console.error("Overview error:", err);
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading system overview…</p>;
  }

  return (
    <div className="space-y-10">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          System Overview
        </h1>
        <p className="text-gray-500 text-sm">
          High-level health and activity across all projects
        </p>
      </div>

      {/* ================= METRICS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Projects" value={stats.totalProjects} />
        <Card title="Total Logs" value={stats.totalLogs} />
        <Card title="Error Rate" value={`${stats.errorRate}%`} />
      </div>

      {/* ================= STATUS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard
          title="System Status"
          value={stats.systemStatus}
          status={stats.systemStatus}
        />
        <Card title="Error Logs" value={stats.totalErrors} />
        <Card title="Most Error-Prone Project" value={stats.worstProject} />
      </div>

      {/* ================= INFO PANEL ================= */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="font-semibold mb-2">What this means</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <li>• Monitor overall system reliability at a glance</li>
          <li>• Identify risky projects early</li>
          <li>• Decide where debugging effort is needed</li>
          <li>• Track growth as logs & projects increase</li>
        </ul>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function StatusCard({ title, value, status }) {
  const color =
    status === "Critical"
      ? "text-red-500"
      : status === "Degraded"
        ? "text-yellow-500"
        : "text-green-500";

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
    </div>
  );
}
