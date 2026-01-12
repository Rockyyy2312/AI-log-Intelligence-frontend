import { LayoutDashboard, FileText, LogOut } from "lucide-react";

export default function Sidebar({ onLogout }) {
  return (
    <div
      className="w-64 min-h-screen
      bg-white dark:bg-gray-900
      border-r dark:border-gray-700
      p-6 flex flex-col"
    >
      <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-10">
        AI Log
      </h2>

      <nav className="flex flex-col gap-4 text-gray-700 dark:text-gray-300">
        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem icon={<FileText size={20} />} label="Logs" />
      </nav>

      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

function NavItem({ icon, label }) {
  return (
    <div
      className="flex items-center gap-3
      px-3 py-2 rounded-lg cursor-pointer
      hover:bg-indigo-100 dark:hover:bg-gray-800"
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
