import { useEffect, useState } from "react";
import api from "../api/api";

export default function MLAnalysis({ project }) {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    api
      .get(`/logs/${project._id}/ml-full`)
      .then((res) => setAnalysis(res.data.analysis));
  }, [project]);

  if (!analysis) return <p>Loading analysis...</p>;

  return (
    <div>
      <h2>{project.name}</h2>

      <div>
        <p>Total Logs: {analysis.summary.total_logs}</p>
        <p>Error Logs: {analysis.summary.error_logs}</p>
        <p>Error Rate: {analysis.summary.error_rate}%</p>
      </div>

      <div>
        <p>Risk Score: {analysis.risk.score}</p>
        <p>Status: {analysis.risk.status}</p>
      </div>
    </div>
  );
}
