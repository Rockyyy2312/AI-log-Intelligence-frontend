import { useEffect, useState } from "react";
import api from "../api/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function ErrorTimeSeries({ projectId, refreshKey }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/logs/${projectId}/timeseries`);
        setData(res.data);
      } catch (err) {
        console.error("Time-series fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [projectId, refreshKey]);

  if (loading) {
    return <p className="text-gray-500">Loading time-series data…</p>;
  }

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
        <h3 className="text-lg font-semibold mb-2">No Error Spikes</h3>
        <p className="text-gray-500">
          No ERROR logs detected yet for this project.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
    >
      <h3 className="text-lg font-semibold mb-4">Error Trend Over Time</h3>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="errors"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
