import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-indigo-100 to-purple-200
      dark:from-gray-900 dark:to-gray-800">

      <div className="bg-white dark:bg-gray-900
        p-8 rounded-xl shadow-xl w-96">

        <h2 className="text-3xl font-bold text-center mb-2
          text-indigo-600 dark:text-indigo-400">
          AI Log Intelligence
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Sign in to your dashboard
        </p>

        <input
          className="w-full mb-3 p-3 rounded-lg border
            bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 p-3 rounded-lg border
            bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700
            text-white py-3 rounded-lg font-semibold">
          Login
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
