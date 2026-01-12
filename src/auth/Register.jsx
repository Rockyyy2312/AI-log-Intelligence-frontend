import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { name, email, password });
      setMessage("Account created. Please login.");
      setError("");
    } catch {
      setError("User already exists or invalid data");
      setMessage("");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-indigo-100 to-purple-200
      dark:from-gray-900 dark:to-gray-800"
    >
      <div
        className="bg-white dark:bg-gray-900
        p-8 rounded-xl shadow-xl w-96"
      >
        <h2
          className="text-3xl font-bold text-center mb-6
          text-indigo-600 dark:text-indigo-400"
        >
          Create Account
        </h2>

        <input
          className="w-full mb-3 p-3 rounded-lg border
            bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-3 p-3 rounded-lg border
            bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 p-3 rounded-lg border
            bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 hover:bg-indigo-700
            text-white py-3 rounded-lg font-semibold"
        >
          Register
        </button>

        {message && <p className="text-green-500 mt-3">{message}</p>}
        {error && <p className="text-red-500 mt-3">{error}</p>}

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
