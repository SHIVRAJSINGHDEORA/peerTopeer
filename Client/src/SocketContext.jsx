import { createContext, useEffect, useContext, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("connecting"); // "connecting" | "connected" | "Failed"

  useEffect(() => {
    const newSocket = io("http://localhost:8080", { withCredentials: true });

    newSocket.on("connect", () => {
      setSocket(newSocket);
      setStatus("connected");
    });

    newSocket.on("connect_error", (err) => {
      console.error(err);
      setStatus("Failed");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, status }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}