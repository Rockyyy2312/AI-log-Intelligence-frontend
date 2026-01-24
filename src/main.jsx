import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";
import socket from "./socket";

// 🔥 CONNECT SOCKET ONCE (GLOBAL)
socket.connect();

socket.on("connect", () => {
  console.log("🟢 Frontend socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </>,
);
