import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { Spinner } from "./components/ui/spinner";
import { useSocket } from "./SocketContext";

export default function RoomGuard() {
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { socket } = useSocket();

  useEffect(() => {
    if (socket?.connected) {
      socket.emit("check-room", id, (res) => {
        const { success } = res;
        console.log("joined room : ", success);

        if (!success) {
          return setTimeout(() => {
            navigate(`video-call/setup/${id}`);
          }, 1000);
        }

        setTimeout(() => {
          setCheck(true);
        }, 1000);
      });
    } else {
      navigate("/home");
    }

    return () => clearTimeout();
  }, []);

  if (!check) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return <Outlet />;
}
