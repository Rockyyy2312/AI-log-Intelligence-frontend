export default function AnalysisTable({ analysis }) {
  const rows = [
    { label: "Total Logs", value: analysis.summary.total_logs },
    { label: "Error Logs", value: analysis.summary.error_logs },
    { label: "Error Rate", value: `${analysis.summary.error_rate}%` },
    { label: "Risk Score", value: analysis.risk.score },
    { label: "System Status", value: analysis.risk.status },
    { label: "Patterns Found", value: analysis.patterns.length },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800 p-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Analysis Summary</h3>

      <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm divide-y divide-slate-200 dark:divide-slate-800">
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-4 px-6 font-medium text-slate-500 dark:text-slate-400">{row.label}</td>
                <td className="py-4 px-6 font-bold text-slate-900 dark:text-white text-right">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
