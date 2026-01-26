import { Routes, Route, Navigate } from "react-router-dom";

/* ================= AUTH ================= */
import Login from "./auth/Login";
import Register from "./auth/Register";

/* ================= DASHBOARD LAYOUT ================= */
import Dashboard from "./dashboard/Dashboard";

/* ================= PAGES ================= */
import Overview from "./pages/Overview";
import Projects from "./pages/Projects";
import ProjectAnalytics from "./pages/ProjectAnalytics";
import Settings from "./pages/Settings";
import LogExplorer from "./pages/LogExplorer";

/* ================= AUTH GUARD ================= */
function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* ========== AUTH ROUTES (NO SIDEBAR) ========== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ========== PROTECTED DASHBOARD ========== */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      >
        {/* Default */}
        <Route index element={<Navigate to="overview" replace />} />

        {/* Pages */}
        <Route path="overview" element={<Overview />} />
        <Route path="projects" element={<Projects />} />
        <Route path="explorer" element={<LogExplorer />} />

        {/* 🔥 PROJECT ANALYTICS (THIS WAS MISSING EARLIER) */}
        <Route path="projects/:projectId" element={<ProjectAnalytics />} />

        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ========== FALLBACK ========== */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
