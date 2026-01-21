import { LayoutDashboard, FolderKanban, Upload, LogOut } from "lucide-react";

export default function Sidebar({ onLogout }) {
  return (
    <div className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-700 p-6 flex flex-col">
      {/* BRAND */}
      <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-10">
        AI Log Intelligence
      </h2>

      {/* NAV */}
      <nav className="flex flex-col gap-3 text-gray-700 dark:text-gray-300">
        <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <NavItem icon={<FolderKanban size={18} />} label="Projects" />
        <NavItem icon={<Upload size={18} />} label="Upload Logs" />
      </nav>

      {/* FOOTER */}
      <div className="mt-auto pt-6 border-t dark:border-gray-700">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

function NavItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-indigo-100 dark:hover:bg-gray-800">
      {icon}
      <span>{label}</span>
    </div>
  );
}
