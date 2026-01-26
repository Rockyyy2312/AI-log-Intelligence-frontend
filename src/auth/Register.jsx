import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { UserPlus, User, Mail, Lock } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await api.post("/auth/register", { name, email, password });
      setMessage("Account created. Please login.");
      setError("");
    } catch {
      setError("User already exists or invalid data");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-primary-500/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-800 z-10 animate-slide-up">

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Account</h1>
          <p className="text-slate-500 mt-2 text-sm">Join to start analyzing your logs.</p>
        </div>

        {message && <div className="mb-6 p-3 bg-emerald-50 text-emerald-600 text-sm rounded-lg text-center font-medium">{message}</div>}
        {error && <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">{error}</div>}

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              className="w-full pl-10 h-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              className="w-full pl-10 h-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              className="w-full pl-10 h-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
            />
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full btn-primary mt-6 mb-6"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center mt-4 text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/" className="text-primary-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
