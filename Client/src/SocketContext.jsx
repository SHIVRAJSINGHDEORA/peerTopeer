import { createContext, useEffect, useContext, useRef, useState } from "react";
import { io } from "socket.io-client";
// import { showToast } from "./components/customToast.js";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(socketRef.current);

  useEffect(() => {
    if(!socketRef.current){
        socketRef.current = io("http://localhost:8080");
        setSocket(socketRef.current);
    }
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log(err);
      // handleError(err.message);
    });
  }, [socketRef.current]);

  //   const handleError = (err) => {
  //     showToast(err, "error", "top-right");
  //   };

  return (
    <>
      <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
    </>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
