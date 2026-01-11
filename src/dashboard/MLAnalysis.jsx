import { useEffect, useState } from "react";
import api from "../api/api";
import LogTimeline from "./LogTimeline";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

export default function MLAnalysis({ project }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/logs/${project._id}/ml-full`)
      .then((res) => {
        setAnalysis(res.data.analysis);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [project]);

  if (loading) {
    return (
      <div className="text-center text-gray-500">Analyzing logs with ML…</div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center text-red-500">Failed to load ML analysis</div>
    );
  }

  const barData = [
    { name: "Errors", value: analysis.summary.error_logs },
    {
      name: "Non Errors",
      value: analysis.summary.total_logs - analysis.summary.error_logs,
    },
  ];

  return (
    <div className="space-y-10">
      {/* SECTION: SUMMARY */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          <Metric title="Total Logs" value={analysis.summary.total_logs} />
          <Metric title="Error Logs" value={analysis.summary.error_logs} />
          <Metric
            title="Error Rate"
            value={`${analysis.summary.error_rate}%`}
          />
        </div>
      </section>

      {/* SECTION: HEALTH */}
      <section>
        <h2 className="text-xl font-semibold mb-4">System Health</h2>
        <div className="bg-white dark:bg-gray-800 p-5 rounded shadow flex items-center gap-4">
          <span className="px-4 py-1 rounded-full bg-blue-600 text-white font-semibold">
            {analysis.risk.status}
          </span>
          <span className="text-gray-500">
            Risk Score: <strong>{analysis.risk.score}</strong>
          </span>
        </div>
      </section>

      {/* SECTION: CHARTS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Log Distribution</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <BarChart width={300} height={250} data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <PieChart width={300} height={250}>
              <Pie
                data={barData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {barData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </section>

      {/* SECTION: PATTERNS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recurring Issues</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          {analysis.patterns.length === 0 ? (
            <p className="text-gray-500">No recurring issues detected 🎉</p>
          ) : (
            <ul className="list-disc pl-5">
              {analysis.patterns.map((p, i) => (
                <li key={i}>
                  {p.message} — <strong>{p.count} times</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* SECTION: TIMELINE */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Logs</h2>
        <LogTimeline projectId={project._id} />
      </section>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
