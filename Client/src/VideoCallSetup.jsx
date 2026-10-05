import { useNavigate, useParams } from "react-router";
import { CallControl } from "./components/CallControl";
import { useEffect, useRef, useState } from "react";
import info from "./assets/info2.svg";
import Time from "./components/Time";
import { VideoTile } from "./components/VideoTile";
import axios from "axios";
import { showToast } from "./components/customToast";
import { useMedia } from "./MediaContext";
import { useSocket } from "./SocketContext";

export default function VideoCallSetup() {
  const params = useParams();
  const id = params.id;
  const [meetData, setMeetData] = useState({ Id: "", user: "", host: "" });
  const navigate = useNavigate();
  const {
    cameraEnabled,
    stream,
    stopMedia,
  } = useMedia();
  const { Id, user, host } = meetData;
  const { socket } = useSocket();

  console.log(socket.connected);

  useEffect(() => {
    const getMeet = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/video-call/${id}`,
          { withCredentials: true },
        );

        console.log(data);
        const { meetId, user, host } = data;
        setMeetData({ Id: meetId, user: user, host: host });
      } catch (err) {
        console.log(err.message);
        handleError(err.response?.data?.message || "Something went wrong!");
        navigate("/home");
      }
    };

    getMeet();
  }, []);

  const handleError = (err) => {
    showToast(err, "error", "top-right");
  };

  const endCall = () => {
    stopMedia();
    navigate("/");
  };

  const joinCall = () => {
    if (socket?.connected) {
      return navigate(`/video-call/room/${Id}`);
    }
    navigate("/home");
  };

  return (
    <div className="h-screen w-full overflow-hidden p-3 pb-0 sm:p-4">
      <div className="flex h-full flex-col items-around justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="h-full w-auto">
            <img className="h-8 w-8" src={info} alt="" />
          </div>
          <div className="text-white font-bold">{Id}</div>
          <div>
            <span> | </span>
          </div>
          <Time />
        </div>
        <VideoTile
          cameraEnabled={cameraEnabled}
          stream={stream}
          isLocal={true}
          name={user}
        />
        <CallControl onJoin={joinCall} onEnd={endCall} />
      </div>
    </div>
  );
}
