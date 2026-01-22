import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  UploadCloud,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Sidebar({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 256 }}
      className="
        min-h-screen
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        flex flex-col
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-800">
        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              AI Log Intelligence
            </h1>
            <p className="text-xs text-gray-500">Monitoring Platform</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-2 py-6 space-y-2">
        <NavItem
          to="/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
          collapsed={collapsed}
        />
        <NavItem
          to="/projects"
          icon={Folder}
          label="Projects"
          collapsed={collapsed}
        />
        <NavItem
          to="/upload"
          icon={UploadCloud}
          label="Upload Logs"
          collapsed={collapsed}
        />
        <NavItem
          to="/settings"
          icon={Settings}
          label="Settings"
          collapsed={collapsed}
        />
      </nav>

      {/* LOGOUT */}
      <div className="p-2 border-t dark:border-gray-800">
        <button
          onClick={onLogout}
          className="
            w-full flex items-center gap-3 px-3 py-2 rounded-lg
            text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20
          "
        >
          <LogOut size={18} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </motion.aside>
  );
}

function NavItem({ to, icon: Icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-3 py-2 rounded-lg
        transition
        ${
          isActive
            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        }
      `
      }
    >
      <Icon size={18} />
      {!collapsed && <span className="font-medium">{label}</span>}
    </NavLink>
  );
}
