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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Analysis Summary</h3>

      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b dark:border-gray-700 last:border-none"
            >
              <td className="py-3 text-gray-500">{row.label}</td>
              <td className="py-3 font-semibold text-right">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
