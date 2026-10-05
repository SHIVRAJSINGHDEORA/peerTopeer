import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { Spinner } from "./components/ui/spinner";
import { useSocket } from "./SocketContext";

export default function RoomGuard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { socket, status } = useSocket();

  useEffect(() => {
    
    if (status === "connecting" || !socket) return;
    
    if (status === "Failed") {
      navigate("/home");
      return;
    }

   
    socket.emit("check-room", id, (res) => {
      if (!res.success) {
        
        navigate(`/video-call/setup/${id}`, { replace: true });
      } else {
        setIsAuthorized(true);
      }
    });
  }, [socket, status, id, navigate]);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return <Outlet />; 
}