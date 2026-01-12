import { useEffect, useState } from "react";
import api from "../api/api";

const levelColor = (level) => {
  if (level === "ERROR") return "bg-red-500";
  if (level === "WARN") return "bg-yellow-500";
  return "bg-green-500";
};

export default function LogTimeline({ projectId }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/logs/${projectId}`)
      .then((res) => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [projectId]);

  if (loading) return <p>Loading logs...</p>;
  if (logs.length === 0) return <p>No logs available</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow max-h-[400px] overflow-y-auto">
      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log._id}
            className="flex items-start gap-3 border-b border-gray-200 dark:border-gray-700 pb-2"
          >
            <span
              className={`text-white text-xs px-2 py-1 rounded ${levelColor(
                log.level
              )}`}
            >
              {log.level}
            </span>

            <div>
              <p className="text-sm">{log.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
