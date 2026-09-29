import { createContext, useEffect, useContext, useRef, useState,useMemo } from "react";
import { io } from "socket.io-client";
// import { showToast } from "./components/customToast.js";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8080",{withCredentials : true});

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.log(err);
      navigate("/home");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

 

  return (
    <>
      <SocketContext.Provider value={{socket}}>
        {children}
      </SocketContext.Provider>
    </>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
