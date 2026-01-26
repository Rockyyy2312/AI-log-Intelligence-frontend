import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Folder, Settings, LogOut, Terminal } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${isActive
      ? "bg-primary-50 text-primary-600 border-r-4 border-primary-600"
      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
    }`;

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
          <Terminal className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            AI Log InteL
          </h1>
          <p className="text-xs text-slate-500 font-medium">Analytics Dashboard</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 flex-1 p-4">
        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-2">
          Menu
        </p>
        <NavLink to="/overview" className={linkClass}>
          <LayoutDashboard className="w-5 h-5" />
          Overview
        </NavLink>
        <NavLink to="/projects" className={linkClass}>
          <Folder className="w-5 h-5" />
          Projects
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all duration-200 font-medium group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Logout
        </button>
      </div>
    </aside>
  );
}
