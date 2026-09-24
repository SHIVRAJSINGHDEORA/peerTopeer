import { Outlet } from "react-router";
import { MediaProvider } from "./MediaContext";

export function VideoCallLayout() {
  return (
    <MediaProvider>
      <Outlet />
    </MediaProvider>
  );
}
