import { Outlet } from "react-router";
import { SocketProvider, useSocket } from "./SocketContext";

export default function VideoCallSocketLayout() {
  return (
    <>
      <SocketProvider>
        <Outlet />
      </SocketProvider>
    </>
  );
}
