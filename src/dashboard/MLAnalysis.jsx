import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import LogTimeline from "./LogTimeline";
import AnalysisTable from "./AnalysisTable";
import { Activity, Layers, AlertCircle, TrendingUp } from "lucide-react";
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

export default function MLAnalysis() {
  const { projectId } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [timeSeries, setTimeSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // ================= FETCH ANALYTICS =================
  useEffect(() => {
    if (!projectId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [analysisRes, tsRes] = await Promise.all([
          api.get(`/logs/${projectId}/ml-full`),
          api.get(`/logs/${projectId}/error-timeseries`),
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
  }, [projectId]);

  // ================= UPLOAD =================
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("logfile", file);
    formData.append("projectId", projectId);

    try {
      setUploading(true);

      await api.post("/logs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploading(false);
      window.location.reload(); // OK for now
    } catch (err) {
      console.error(err);
      setUploading(false);
      alert("Upload failed");
    }
  };

  // ================= UI =================
  return (
    <div className="space-y-10 animate-fade-in">
      {/* HEADER Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Project Analytics</h1>
          <p className="text-slate-500">Deep dive into logs and error trends.</p>
        </div>

        <div className="relative overflow-hidden">
          <input
            type="file"
            accept=".log,.txt"
            onChange={handleUpload}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <button className={`${uploading ? 'bg-slate-400' : 'btn-primary'} flex items-center gap-2`}>
            {uploading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Layers className="w-4 h-4" />
            )}
            <span>{uploading ? "Analyzing..." : "Upload New Log"}</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-20">
          <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
        </div>
      )}

      {!loading && analysis?.summary.total_logs === 0 && (
        <div className="bg-white dark:bg-slate-900 p-12 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800 text-center">
          <Activity className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Analysis Data</h3>
          <p className="text-slate-500 max-w-md mx-auto mt-2">Upload a log file to generate ML insights and visualize patterns.</p>
        </div>
      )}

      {!loading && analysis?.summary.total_logs > 0 && (
        <>
          {/* METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Metric title="Total Logs" value={analysis.summary.total_logs.toLocaleString()} icon={Layers} color="text-blue-500 bg-blue-50" />
            <Metric title="Error Logs" value={analysis.summary.error_logs.toLocaleString()} icon={AlertCircle} color="text-red-500 bg-red-50" />
            <Metric
              title="Error Rate"
              value={`${analysis.summary.error_rate}%`}
              icon={TrendingUp}
              color={analysis.summary.error_rate > 20 ? "text-red-500 bg-red-50" : "text-emerald-500 bg-emerald-50"}
            />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartCard title="Error Distribution">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={[
                    { name: "Errors", value: analysis.summary.error_logs },
                    {
                      name: "Success",
                      value:
                        analysis.summary.total_logs -
                        analysis.summary.error_logs,
                    },
                  ]}
                  barSize={40}
                >
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    cursor={{ fill: 'transparent' }}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 6, 6]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Error Trend Over Time">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={timeSeries}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="time" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="errors"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ r: 4, stroke: '#ef4444', strokeWidth: 2, fill: '#fff' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <AnalysisTable analysis={analysis} />
            </div>
            <div className="lg:col-span-2">
              <LogTimeline projectId={projectId} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Metric({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h2>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800">
      <h3 className="font-bold text-slate-900 dark:text-white mb-6">{title}</h3>
      {children}
    </div>
  )
}
