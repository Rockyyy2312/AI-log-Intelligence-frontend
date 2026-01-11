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
    <div
      style={{
        maxWidth: "350px",
        margin: "100px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />

      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
