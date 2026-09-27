import { useNavigate, useParams } from "react-router";
import { CallControl } from "./components/CallControl";
import { useEffect, useRef, useState } from "react";
import info from "./assets/info2.svg";
import Time from "./components/Time";
import { VideoTile } from "./components/VideoTile";
import axios from "axios";
import { showToast } from "./components/customToast";
import { useMedia } from "./MediaContext";
import { VideoGrid } from "./components/VideoGrid";

export default function VideoCallRoom() {
  const params = useParams();
  const id = params.id;
  const [meetData, setMeetData] = useState({ Id: "", user: "", host: "" });

  const navigate = useNavigate();

  const { cameraEnabled, stream, setStream, setCameraEnabled, setMicEnabled } =
    useMedia();
  const { Id, user, host } = meetData;

  useEffect(() => {
    const getMeet = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/video-call/${id}`,
          { withCredentials: true },
        );

        console.log(data);
        const { meetId, user, host } = data;
        setMeetData((prev) => ({
          ...prev,
          Id: meetId,
          user: user,
          host: host,
        }));
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

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });

      setStream(null);
      setCameraEnabled(false);
      setMicEnabled(false);

      navigate("/");
    }
  };

  return (
    <div className="h-screen w-full lg:overflow-hidden p-3 pb-0 sm:p-4">
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
        <VideoGrid user={{ id: user }} />
        <div className="shrink-0 pb-3 sm:pb-0">
          <CallControl onJoin={endCall} onEnd={endCall} />
        </div>
      </div>
    </div>
  );
}
