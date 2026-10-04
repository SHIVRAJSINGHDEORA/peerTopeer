import { Outlet, useNavigate } from "react-router";
import { MediaProvider } from "./MediaContext";
import { useSocket } from "./SocketContext";
import { Spinner } from "./components/ui/spinner";
import { showToast } from "./components/customToast";
import { useEffect } from "react";

export function VideoCallLayout() {
  const { status, err } = useSocket();
  const navigate = useNavigate();

  if (err) {
    showToast(err, "error", "top-right");
    setTimeout(() => {
      navigate("/home");
    }, [3000]);
  }

  if (status !== "connected") {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-2xl mr-4">Joining</div>
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <MediaProvider>
      <Outlet />
    </MediaProvider>
  );
}
