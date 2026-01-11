import { useEffect, useState } from "react";
import api from "../api/api";
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

  if (loading) return <p>Loading analysis...</p>;
  if (!analysis) return <p className="text-red-500">Failed to load analysis</p>;

  const barData = [
    { name: "Errors", value: analysis.summary.error_logs },
    {
      name: "Non Errors",
      value: analysis.summary.total_logs - analysis.summary.error_logs,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Metric title="Total Logs" value={analysis.summary.total_logs} />
        <Metric title="Error Logs" value={analysis.summary.error_logs} />
        <Metric title="Error Rate" value={`${analysis.summary.error_rate}%`} />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-semibold mb-2">System Health</h3>
        <span className="px-3 py-1 rounded-full bg-blue-600 text-white">
          {analysis.risk.status} (Score: {analysis.risk.score})
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="mb-2 font-semibold">Log Distribution</h3>
          <BarChart width={300} height={250} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="mb-2 font-semibold">Error Ratio</h3>
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

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Recurring Issues</h3>
        {analysis.patterns.length === 0 ? (
          <p>No recurring issues detected 🎉</p>
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
