import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // ✅ Use HashRouter for safer Vercel routing
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";
import socket from "./socket";

// 🔥 CONNECT SOCKET ONCE (GLOBAL)
socket.connect();

socket.on("connect", () => {
  console.log("🟢 Frontend socket connected:", socket.id);
  console.log("🚀 VERSION_DEBUG_1: HashRouter + Link Fixes Applied");
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <HashRouter>
        <App />
      </HashRouter>
    </GoogleOAuthProvider>
  </>,
);
