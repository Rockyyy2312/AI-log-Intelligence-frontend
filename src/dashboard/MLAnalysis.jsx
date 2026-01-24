import { useEffect, useState } from "react";
import api from "../api/api";
import LogTimeline from "./LogTimeline";
import AnalysisTable from "./AnalysisTable";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MLAnalysis({ project, refreshKey }) {
  const [analysis, setAnalysis] = useState(null);
  const [timeSeries, setTimeSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // ================= FETCH ANALYTICS =================
  useEffect(() => {
    if (!project) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [analysisRes, tsRes] = await Promise.all([
          api.get(`/logs/${project._id}/ml-full`),
          api.get(`/logs/${project._id}/error-timeseries`),
        ]);

        setAnalysis(analysisRes.data);
        setTimeSeries(tsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [project, refreshKey]);

  // ================= UPLOAD =================
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("logfile", file);
    formData.append("projectId", project._id);

    try {
      setUploading(true);

      await api.post("/logs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploading(false);
      window.location.reload(); // safe for now
    } catch (err) {
      console.error(err);
      setUploading(false);
      alert("Upload failed");
    }
  };

  // ================= UI =================
  return (
    <div className="space-y-10">
      {/* ================= UPLOAD ALWAYS VISIBLE ================= */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">Upload & Analyze Logs</h3>
        <input
          type="file"
          accept=".log,.txt"
          onChange={handleUpload}
          disabled={uploading}
        />
        {uploading && (
          <p className="text-indigo-500 text-sm mt-2">Uploading & analyzing…</p>
        )}
      </div>

      {/* ================= LOADING ================= */}
      {loading && <p className="text-gray-500">Analyzing logs…</p>}

      {/* ================= EMPTY STATE ================= */}
      {!loading && analysis?.summary.total_logs === 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">No logs uploaded yet.</p>
        </div>
      )}

      {/* ================= ANALYTICS ================= */}
      {!loading && analysis?.summary.total_logs > 0 && (
        <>
          {/* METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Metric title="Total Logs" value={analysis.summary.total_logs} />
            <Metric title="Error Logs" value={analysis.summary.error_logs} />
            <Metric
              title="Error Rate"
              value={`${analysis.summary.error_rate}%`}
            />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-4">Error Distribution</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={[
                    { name: "Errors", value: analysis.summary.error_logs },
                    {
                      name: "Non Errors",
                      value:
                        analysis.summary.total_logs -
                        analysis.summary.error_logs,
                    },
                  ]}
                  barSize={36}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-4">Error Trend Over Time</h3>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={timeSeries}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="errors"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <AnalysisTable analysis={analysis} />
          <LogTimeline projectId={project._id} />
        </>
      )}
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
