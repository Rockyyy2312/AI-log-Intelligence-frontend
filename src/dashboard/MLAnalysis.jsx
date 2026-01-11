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

const getRiskColor = (status) => {
  if (status === "Healthy") return "#16a34a";
  if (status === "Degraded") return "#f59e0b";
  return "#dc2626";
};

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

  if (loading) return <p>Loading system analysis...</p>;
  if (!analysis) return <p style={{ color: "red" }}>Failed to load analysis</p>;

  const barData = [
    { name: "Errors", value: analysis.summary.error_logs },
    {
      name: "Non Errors",
      value: analysis.summary.total_logs - analysis.summary.error_logs,
    },
  ];

  const pieData = [
    { name: "Errors", value: analysis.summary.error_logs },
    {
      name: "Non Errors",
      value: analysis.summary.total_logs - analysis.summary.error_logs,
    },
  ];

  return (
    <div style={{ display: "grid", gap: "24px", marginTop: "24px" }}>
      {/* METRIC CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        <MetricCard title="Total Logs" value={analysis.summary.total_logs} />
        <MetricCard title="Error Logs" value={analysis.summary.error_logs} />
        <MetricCard
          title="Error Rate"
          value={`${analysis.summary.error_rate}%`}
        />
      </div>

      {/* RISK */}
      <div style={cardStyle}>
        <h3>System Health</h3>
        <span
          style={{
            padding: "6px 12px",
            borderRadius: "999px",
            background: getRiskColor(analysis.risk.status),
            color: "white",
            fontWeight: "bold",
          }}
        >
          {analysis.risk.status} (Score: {analysis.risk.score})
        </span>
      </div>

      {/* CHARTS */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
      >
        <div style={cardStyle}>
          <h3>Log Distribution (Bar)</h3>
          <BarChart width={300} height={250} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </div>

        <div style={cardStyle}>
          <h3>Error vs Non-Error (Pie)</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* PATTERNS */}
      <div style={cardStyle}>
        <h3>Recurring Issues</h3>
        {analysis.patterns.length === 0 ? (
          <p>No recurring issues detected 🎉</p>
        ) : (
          <ul>
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
    <div
      style={{
        padding: "16px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        background: "#fafafa",
      }}
    >
      <p style={{ fontSize: "14px", color: "#6b7280" }}>{title}</p>
      <h2 style={{ margin: 0 }}>{value}</h2>
    </div>
  );
}

const cardStyle = {
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  background: "#ffffff",
};
