import io from "socket.io-client";
const BASE_SOCKET =
	(import.meta.env.VITE_BASE_SOCKET as string) || "http://localhost:4000";
// const BASE_SOCKET = "http://localhost:4000";
export const socket = io(BASE_SOCKET);
