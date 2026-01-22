import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./dashboard/Dashboard";
import Projects from "./pages/Projects";
import UploadLogs from "./pages/UploadLogs";
import Settings from "./pages/Settings";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/projects"
        element={token ? <Projects /> : <Navigate to="/" />}
      />
      <Route
        path="/upload"
        element={token ? <UploadLogs /> : <Navigate to="/" />}
      />
      <Route
        path="/settings"
        element={token ? <Settings /> : <Navigate to="/" />}
      />

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
