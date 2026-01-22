import { useEffect, useState } from "react";
import api from "../api/api";
import LogTimeline from "./LogTimeline";
import AnalysisTable from "./AnalysisTable";
import ErrorTimeSeries from "./ErrorTimeSeries";
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

export default function MLAnalysis({ project, refreshKey }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/logs/${project._id}/ml-full`);
        setAnalysis(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [project, refreshKey]);

  if (loading) {
    return <p className="text-gray-500">Analyzing logs…</p>;
  }

  if (!analysis || analysis.summary.total_logs === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
        <h3 className="text-lg font-semibold mb-2">No Logs Found</h3>
        <p className="text-gray-500">Upload logs to start analysis.</p>
      </div>
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
    <div className="grid grid-cols-12 gap-6">
      {/* METRICS */}
      <Metric title="Total Logs" value={analysis.summary.total_logs} />
      <Metric title="Error Logs" value={analysis.summary.error_logs} />
      <Metric title="Error Rate" value={`${analysis.summary.error_rate}%`} />

      {/* BAR CHART */}
      <div className="col-span-6 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3">Error Distribution</h3>
        <BarChart width={350} height={250} data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#6366f1" />
        </BarChart>
      </div>

      {/* PIE CHART */}
      <div className="col-span-6 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3">Log Composition</h3>
        <PieChart width={350} height={250}>
          <Pie
            data={barData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {barData.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* 🔥 TIME-SERIES */}
      <div className="col-span-12">
        <ErrorTimeSeries projectId={project._id} refreshKey={refreshKey} />
      </div>

      {/* TABLE */}
      <div className="col-span-12">
        <AnalysisTable analysis={analysis} />
      </div>

      {/* LOG TIMELINE */}
      <div className="col-span-12">
        <LogTimeline projectId={project._id} />
      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
