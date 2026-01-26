import { useState } from "react";
import { User, Bell, Cpu, Trash2, Save } from "lucide-react";

export default function Settings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoAnalyze, setAutoAnalyze] = useState(true);

  return (
    <div className="max-w-3xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-2">Manage your preferences and system configurations.</p>
      </div>

      {/* Profile */}
      <Section title="Profile" icon={User} description="Manage your personal account details.">
        <div className="flex items-center gap-4 py-2">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-2xl">
            U
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">Admin User</p>
            <p className="text-sm text-slate-500">admin@ailogintel.com</p>
          </div>
        </div>
      </Section>

      {/* Preferences */}
      <Section title="Preferences" icon={Bell} description="Customize your notification settings.">
        <Toggle
          label="Enable error email alerts"
          description="Get notified when an error rate exceeds 20%."
          checked={emailAlerts}
          onChange={setEmailAlerts}
        />
        <Toggle
          label="Auto analyze logs after upload"
          description="Automatically trigger ML analysis on new log files."
          checked={autoAnalyze}
          onChange={setAutoAnalyze}
        />
      </Section>

      {/* System */}
      <Section title="System" icon={Cpu} description="System-level configurations.">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Log Retention</p>
            <p className="text-slate-900 dark:text-white font-medium">30 Days</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Analysis Mode</p>
            <p className="text-slate-900 dark:text-white font-medium">Batch Processing</p>
          </div>
        </div>
      </Section>

      {/* Danger */}
      <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/30">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-red-700 dark:text-red-400">Danger Zone</h2>
            <p className="text-sm text-red-600/80 mb-4">Irreversible actions. Please be careful.</p>
            <button className="px-4 py-2 bg-white dark:bg-red-900 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
              Delete all logs (Disabled)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, description, children }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-soft border border-slate-200 dark:border-slate-800 space-y-6">
      <div className="flex items-start gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div>
        <p className="font-medium text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">{label}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={() => onChange(!checked)}
        />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
      </div>
    </label>
  );
}
