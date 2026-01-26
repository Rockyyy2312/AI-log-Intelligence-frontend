import { useEffect, useState } from "react";
import api from "../api/api";
import { Search, Filter, AlertTriangle, Info, AlertCircle, FileText, Layers, XCircle } from "lucide-react";

export default function LogExplorer() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [levelFilter, setLevelFilter] = useState("ALL");

    // Fetch Projects on Mount
    useEffect(() => {
        api.get("/projects").then((res) => {
            setProjects(res.data || []);
            if (res.data.length > 0) {
                setSelectedProject(res.data[0]._id);
            }
        });
    }, []);

    // Fetch Logs when Project Changes
    useEffect(() => {
        if (!selectedProject) return;

        setLoading(true);
        api.get(`/logs/${selectedProject}`)
            .then((res) => {
                setLogs(res.data || []);
                setFilteredLogs(res.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch logs", err);
                setLoading(false);
            });
    }, [selectedProject]);

    // Filter Logic
    useEffect(() => {
        let result = logs;

        if (search) {
            result = result.filter(log =>
                log.message.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (levelFilter !== "ALL") {
            result = result.filter(log => log.level === levelFilter);
        }

        setFilteredLogs(result);
    }, [search, levelFilter, logs]);

    const getLevelBadge = (level) => {
        if (level === "ERROR") return <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"><AlertCircle className="w-3 h-3" /> ERROR</span>;
        if (level === "WARN") return <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"><AlertTriangle className="w-3 h-3" /> WARN</span>;
        return <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"><Info className="w-3 h-3" /> INFO</span>;
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-6 animate-fade-in">
            {/* HEADER & CONTROLS */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white dark:bg-slate-900 p-6 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Search className="w-6 h-6 text-primary-500" />
                        Log Explorer
                    </h1>
                    <p className="text-slate-500 mt-1">Search and analyze logs across your projects.</p>
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    {/* Project Select */}
                    <div className="relative">
                        <Layers className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <select
                            className="pl-9 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none w-full md:w-48 appearance-none"
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                        >
                            {projects.map(p => (
                                <option key={p._id} value={p._id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Level Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <select
                            className="pl-9 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none w-full md:w-40 appearance-none"
                            value={levelFilter}
                            onChange={(e) => setLevelFilter(e.target.value)}
                        >
                            <option value="ALL">All Levels</option>
                            <option value="ERROR">Errors</option>
                            <option value="WARN">Warnings</option>
                            <option value="INFO">Info</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* SEARCH BAR */}
            <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    placeholder="Search by keyword, error code, or message..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <button onClick={() => setSearch("")} className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600">
                        <XCircle className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* RESULTS TABLE */}
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                <div className="overflow-y-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 sticky top-0 z-10">
                            <tr>
                                <th className="p-4 border-b border-slate-200 dark:border-slate-800 font-semibold text-slate-500 dark:text-slate-400 w-24">Level</th>
                                <th className="p-4 border-b border-slate-200 dark:border-slate-800 font-semibold text-slate-500 dark:text-slate-400 w-48">Timestamp</th>
                                <th className="p-4 border-b border-slate-200 dark:border-slate-800 font-semibold text-slate-500 dark:text-slate-400">Message</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                            {loading ? (
                                <tr>
                                    <td colSpan="3" className="p-8 text-center">
                                        <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                                    </td>
                                </tr>
                            ) : filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="p-12 text-center text-slate-400">
                                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No logs found matching your criteria.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredLogs.map((log) => (
                                    <tr key={log._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors font-mono text-sm">
                                        <td className="p-4 align-top">{getLevelBadge(log.level)}</td>
                                        <td className="p-4 text-slate-500 whitespace-nowrap align-top">
                                            {new Date(log.createdAt).toLocaleString()}
                                        </td>
                                        <td className="p-4 text-slate-700 dark:text-slate-300 break-all align-top">
                                            {log.message}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 text-xs text-slate-500 flex justify-between">
                    <span>Showing {filteredLogs.length} logs</span>
                    <span>Project ID: {selectedProject}</span>
                </div>
            </div>
        </div>
    );
}
