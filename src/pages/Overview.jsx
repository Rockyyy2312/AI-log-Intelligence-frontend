import { useEffect, useState } from "react";
import api from "../api/api";

export default function Overview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/projects/summary")
      .then((res) => {
        setStats(res.data);
      })
      .catch(() => {
        setStats(null);
      });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        System Overview
      </h1>

      {!stats ? (
        <p className="text-gray-500">Loading system metrics...</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          <Card title="Total Projects" value={stats.projects} />
          <Card title="Total Logs" value={stats.logs} />
          <Card title="Error Rate" value={`${stats.errorRate}%`} />
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h2 className="font-semibold mb-2">System Status</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time monitoring active. ML anomaly detection enabled.
        </p>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
