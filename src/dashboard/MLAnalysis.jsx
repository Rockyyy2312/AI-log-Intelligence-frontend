import { useEffect, useState } from "react";
import api from "../api/api";
import LogTimeline from "./LogTimeline";
import { motion } from "framer-motion";
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

  useEffect(() => {
    api
      .get(`/logs/${project._id}/ml-full`)
      .then((res) => setAnalysis(res.data.analysis));
  }, [project]);

  if (!analysis) {
    return <p className="text-gray-500">Analyzing logs…</p>;
  }

  const barData = [
    { name: "Errors", value: analysis.summary.error_logs },
    {
      name: "Non Errors",
      value: analysis.summary.total_logs - analysis.summary.error_logs,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      <div className="grid grid-cols-3 gap-4">
        {[
          ["Total Logs", analysis.summary.total_logs],
          ["Error Logs", analysis.summary.error_logs],
          ["Error Rate", `${analysis.summary.error_rate}%`],
        ].map(([title, value], i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
          >
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="text-2xl font-bold">{value}</h2>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
        >
          <BarChart width={300} height={250} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
        >
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
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <LogTimeline projectId={project._id} />
      </motion.div>
    </motion.div>
  );
}
