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
      setMessage("Registration successful. Please login.");
      setError("");
    } catch {
      setError("User already exists or invalid data");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-4"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Register
        </button>

        {message && <p className="text-green-600 mt-3">{message}</p>}
        {error && <p className="text-red-500 mt-3">{error}</p>}

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
