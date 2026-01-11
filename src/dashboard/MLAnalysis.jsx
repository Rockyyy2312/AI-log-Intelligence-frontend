import { useEffect, useState } from "react";
import api from "../api/api";

const getRiskColor = (status) => {
  if (status === "Healthy") return "green";
  if (status === "Degraded") return "orange";
  return "red";
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

  if (loading) return <p>Loading analysis...</p>;
  if (!analysis) return <p>No analysis available</p>;

  return (
    <div style={{ maxWidth: "700px", display: "grid", gap: "20px" }}>
      {/* SUMMARY */}
      <div>
        <h3>Log Summary</h3>
        <p>
          Total Logs: <strong>{analysis.summary.total_logs}</strong>
        </p>
        <p>
          Error Logs: <strong>{analysis.summary.error_logs}</strong>
        </p>
        <p>
          Error Rate: <strong>{analysis.summary.error_rate}%</strong>
        </p>
      </div>

      {/* RISK */}
      <div>
        <h3>System Health</h3>
        <p>
          Risk Score: <strong>{analysis.risk.score}</strong>
        </p>
        <p style={{ color: getRiskColor(analysis.risk.status) }}>
          Status: <strong>{analysis.risk.status}</strong>
        </p>
      </div>

      {/* PATTERNS */}
      <div>
        <h3>Recurring Patterns</h3>
        {analysis.patterns.length === 0 ? (
          <p>No recurring issues detected 🎉</p>
        ) : (
          <ul>
            {analysis.patterns.map((p, idx) => (
              <li key={idx}>
                {p.message} — <strong>{p.count} times</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
