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
  const [err, setErr] = useState(null);
  const [status, setStatus] = useState("connecting");
  const [newUser, setNewUser] = useState(null);
  const [incomingOffer, setIncomingOffer] = useState(null);
  const [incomingAnswer, setIncomingAnswer] = useState(null);
  const [incomingIceCandidate, setIncomingIceCandidate] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8080", { withCredentials: true });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(newSocket.id);
      setStatus("connected");
    });

    newSocket.on("connect_error", (err) => {
      console.log(err);
      setErr(err.message || "something went wrong!");
      setStatus("Failed");
    });

    newSocket.on("new-user", (data) => {
      setNewUser(data);
    });

    newSocket.on("offer", (data) => {
      setIncomingOffer(data);
    });

    newSocket.on("answer", (data) => {
      setIncomingAnswer(data);
    });

    newSocket.on("ice-candidate", (data) => {
      setIncomingIceCandidate(data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <>
      <SocketContext.Provider
        value={{
          socket,
          err,
          status,
          newUser,
          incomingOffer,
          incomingAnswer,
          incomingIceCandidate,
        }}
      >
        {children}
      </SocketContext.Provider>
    </>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
