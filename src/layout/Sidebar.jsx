import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Folder, Settings, LogOut, Terminal, Sun, Moon, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 font-medium whitespace-nowrap overflow-hidden ${isActive
      ? "bg-primary-50 text-primary-600 border-r-4 border-primary-600"
      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
    } ${isCollapsed ? "justify-center" : ""}`;

  return (
    <aside
      className={`${isCollapsed ? "w-20" : "w-72"} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 transition-all duration-300 z-20`}
    >
      {/* HEADER */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between pb-4">
        <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}>
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg shrink-0">
            <Terminal className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in origin-left">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight whitespace-nowrap">
                AI Log InteL
              </h1>
              <p className="text-xs text-slate-500 font-medium">Dashboard</p>
            </div>
          )}
        </div>
      </div>

      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-1 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors z-50">
        {isCollapsed ? <ChevronRight className="w-4 h-4 text-slate-500" /> : <ChevronLeft className="w-4 h-4 text-slate-500" />}
      </button>

      {/* NAV */}
      <nav className="flex flex-col gap-1 flex-1 p-3 overflow-y-auto">
        {!isCollapsed && (
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-2 truncate">
            Menu
          </p>
        )}

        <NavLink to="/overview" className={linkClass} title="Overview">
          <LayoutDashboard className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Overview</span>}
        </NavLink>
        <NavLink to="/projects" className={linkClass} title="Projects">
          <Folder className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Projects</span>}
        </NavLink>
        <NavLink to="/explorer" className={linkClass} title="Log Explorer">
          <Search className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Log Explorer</span>}
        </NavLink>
        <NavLink to="/settings" className={linkClass} title="Settings">
          <Settings className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
      </nav>

      {/* FOOTER */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`flex w-full items-center gap-3 px-3 py-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 font-medium ${isCollapsed ? 'justify-center' : ''}`}
          title={isDark ? "Light Mode" : "Dark Mode"}
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-500 shrink-0" /> : <Moon className="w-5 h-5 text-indigo-500 shrink-0" />}
          {!isCollapsed && <span>{isDark ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        <button
          onClick={logout}
          className={`flex w-full items-center gap-3 px-3 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all duration-200 font-medium group ${isCollapsed ? 'justify-center' : ''}`}
          title="Logout"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
