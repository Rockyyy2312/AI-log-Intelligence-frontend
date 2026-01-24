import { Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import Login from "./auth/Login";
import Register from "./auth/Register";

/* DASHBOARD LAYOUT */
import Dashboard from "./dashboard/Dashboard";

/* PAGES */
import Overview from "./pages/Overview";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";

/* AUTH GUARD */
function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* ========= AUTH (NO DASHBOARD) ========= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ========= APP (PROTECTED) ========= */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="projects" element={<Projects />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ========= FALLBACK ========= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
