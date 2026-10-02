import { Outlet, Navigate } from "react-router";
import { MediaProvider } from "./MediaContext";
import { useSocket } from "./SocketContext";
import { Spinner } from "./components/ui/spinner";
import { showToast } from "./components/customToast";
import { useEffect } from "react";

export function VideoCallLayout() {
  const { loading, connected, err } = useSocket();

  useEffect(() => {
    if (!loading && !connected) {
      showToast(err, "err", "top-right");
      navigate("/home");
    }
  }, [loading, connected, err]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!connected) {
    return null;
  }

  return (
    <MediaProvider>
      <Outlet />
    </MediaProvider>
  );
}
