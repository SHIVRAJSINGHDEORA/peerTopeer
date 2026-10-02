import {
  createContext,
  useEffect,
  useContext,
  useRef,
  useState,
  useMemo,
} from "react";
import { io } from "socket.io-client";


export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("Something went wrong!");

  useEffect(() => {
    const newSocket = io("http://localhost:8080", { withCredentials: true });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(newSocket.id);
      setConnected(true);
      setLoading(false);
    });

    newSocket.on("connect_error", (err) => {
      console.log(err);
      setErr(err);
      setConnected(false);
      setLoading(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);


  return (
    <>
      <SocketContext.Provider value={{ socket , connected, loading, err}}>
        {children}
      </SocketContext.Provider>
    </>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
