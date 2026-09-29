import { Outlet } from "react-router";
import { MediaProvider } from "./MediaContext";
import { SocketProvider } from "./SocketContext";

export function VideoCallLayout() {
  return (
    <MediaProvider>
      <SocketProvider>
        <Outlet />
      </SocketProvider>
    </MediaProvider>
  );
}
