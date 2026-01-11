import { useEffect, useState } from "react";
import api from "../api/api";

const getRiskColor = (status) => {
  if (status === "Healthy") return "#16a34a"; // green
  if (status === "Degraded") return "#f59e0b"; // amber
  return "#dc2626"; // red
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

  return (
    <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
      {/* SUMMARY CARDS */}
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
