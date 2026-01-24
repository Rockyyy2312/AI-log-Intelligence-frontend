import { useEffect, useState } from "react";
import api from "../api/api";
import socket from "../socket";

const levelColor = (level) => {
  if (level === "ERROR") return "bg-red-500";
  if (level === "WARN") return "bg-yellow-500";
  return "bg-green-500";
};

export default function LogTimeline({ projectId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let mounted = true;

    const loadLogs = async () => {
      const res = await api.get(`/logs/${projectId}`);
      if (mounted) setLogs(res.data);
    };

    loadLogs();

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join-project", projectId);

    socket.on("new-log", (log) => {
      console.log("📥 Received log:", log.message);
      setLogs((prev) => [log, ...prev]);
    });

    return () => {
      mounted = false;
      socket.off("new-log"); // ✅ DO NOT DISCONNECT
    };
  }, [projectId]);

  if (logs.length === 0) return <p>No logs yet</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow max-h-[400px] overflow-y-auto">
      {logs.map((log) => (
        <div key={log._id} className="flex gap-3 border-b pb-2">
          <span
            className={`text-xs px-2 py-1 rounded text-white ${levelColor(
              log.level,
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
  );
}
