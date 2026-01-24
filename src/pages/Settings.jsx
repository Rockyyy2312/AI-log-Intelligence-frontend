import { useState } from "react";

export default function Settings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoAnalyze, setAutoAnalyze] = useState(true);

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="text-3xl font-bold text-indigo-600">Settings</h1>

      {/* Profile */}
      <Section title="Profile">
        <p className="text-gray-500">Logged in user preferences</p>
      </Section>

      {/* Preferences */}
      <Section title="Preferences">
        <Toggle
          label="Enable error email alerts"
          checked={emailAlerts}
          onChange={setEmailAlerts}
        />
        <Toggle
          label="Auto analyze logs after upload"
          checked={autoAnalyze}
          onChange={setAutoAnalyze}
        />
      </Section>

      {/* System */}
      <Section title="System">
        <p className="text-sm text-gray-500">Log retention: 30 days</p>
        <p className="text-sm text-gray-500">Analysis mode: Batch</p>
      </Section>

      {/* Danger */}
      <Section title="Danger Zone">
        <button className="text-red-600 hover:underline">
          Delete all logs (future)
        </button>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
    </label>
  );
}
