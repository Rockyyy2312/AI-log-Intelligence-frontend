import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false, // we control when to connect
  transports: ["websocket"],
});

export default socket;
