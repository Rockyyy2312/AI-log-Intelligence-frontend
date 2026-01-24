import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-6 flex flex-col">
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">
        AI Log Intelligence
      </h1>

      <nav className="flex flex-col gap-2 flex-1">
        <NavLink to="/overview" className={linkClass}>
          Overview
        </NavLink>
        <NavLink to="/projects" className={linkClass}>
          Projects
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          Settings
        </NavLink>
      </nav>

      <button
        onClick={logout}
        className="mt-6 text-red-500 hover:underline text-left"
      >
        Logout
      </button>
    </aside>
  );
}
