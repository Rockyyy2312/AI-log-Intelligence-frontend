import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL;

if (!socketUrl) {
  console.error("❌ Socket URL is missing! Please check your .env file or Vercel environment variables.");
}

const socket = io(socketUrl, {
  autoConnect: false, // we control when to connect
  transports: ["websocket"],
});

export default socket;
