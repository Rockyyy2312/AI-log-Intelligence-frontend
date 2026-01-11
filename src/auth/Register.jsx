import { useState } from "react";
import api from "../api/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });
      setMessage("Registration successful. Please login.");
      setError("");
    } catch (err) {
      setError("User already exists or invalid data");
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "100px auto" }}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />

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

      <button onClick={handleRegister}>Register</button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
