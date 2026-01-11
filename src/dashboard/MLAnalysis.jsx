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

const COLORS = ["#16a34a", "#dc2626"];

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

  const pieData = barData;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <MetricCard title="Total Logs" value={analysis.summary.total_logs} />
        <MetricCard title="Error Logs" value={analysis.summary.error_logs} />
        <MetricCard
          title="Error Rate"
          value={`${analysis.summary.error_rate}%`}
        />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">System Health</h3>
        <span className="px-3 py-1 rounded-full bg-blue-600 text-white">
          {analysis.risk.status} (Score: {analysis.risk.score})
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="mb-2 font-semibold">Log Distribution</h3>
          <BarChart width={300} height={250} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="mb-2 font-semibold">Error Ratio</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
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

function MetricCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
