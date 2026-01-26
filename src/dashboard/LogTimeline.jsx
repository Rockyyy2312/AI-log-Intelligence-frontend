import { useEffect, useState } from "react";
import api from "../api/api";
import socket from "../socket";
import { AlertCircle, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const getLogStyle = (level) => {
  if (level === "ERROR") return { bg: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400", icon: AlertCircle };
  if (level === "WARN") return { bg: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400", icon: AlertTriangle };
  return { bg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400", icon: CheckCircle };
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

  if (logs.length === 0) return (
    <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft">
      <p className="text-slate-500">No logs stream available yet.</p>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Live Log Stream</h3>
        <div className="flex items-center gap-2 text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full animate-pulse">
          <div className="w-2 h-2 rounded-full bg-primary-600" />
          Live
        </div>
      </div>

      <div className="max-h-[500px] overflow-y-auto p-0">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {logs.map((log) => {
            const style = getLogStyle(log.level);
            const Icon = style.icon;
            return (
              <div key={log._id} className="group p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-4 items-start">
                <div className={`p-2 rounded-lg ${style.bg} shrink-0 mt-1`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.bg} bg-opacity-50`}>
                      {log.level}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                      <Clock className="w-3 h-3" />
                      {new Date(log.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-mono break-all leading-relaxed">
                    {log.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
