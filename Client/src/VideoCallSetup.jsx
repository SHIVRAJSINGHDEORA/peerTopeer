import { useNavigate, useParams } from "react-router";
import { CallControl } from "./components/CallControl";
import { useEffect, useRef, useState } from "react";
import info from "./assets/info2.svg";
import Time from "./components/Time";
import { VideoTile } from "./components/VideoTile";

export default function VideoCallSetup() {
  const params = useParams();
  const id = params.id;
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [selectedMic, setSelectedMic] = useState("");
  const [mics, setMics] = useState([]);
  const [stream, setStream] = useState();
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const constraints = {
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
    video: {
      width: { min: 640, ideal: 1280, max: 1920 },
      height: { min: 480, ideal: 720, max: 1080 },
      frameRate: { ideal: 30, max: 60 },
      facingMode: "user",
    },
  };

  const navigate = useNavigate();

  const getConnectedDevices = async (type) => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind == type);
  };

  const getPermission = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);

      const videoTrack = newStream.getVideoTracks()[0];
      const audioTrack = newStream.getAudioTracks()[0];
      const deviceIdVideo = videoTrack.getSettings().deviceId;
      const deviceIdAudio = audioTrack.getSettings().deviceId;

      setSelectedCamera(deviceIdVideo);
      setSelectedMic(deviceIdAudio);

      newStream.getVideoTracks().forEach((track) => {
        track.enabled = false;
      });

      newStream.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });

      const cameras = await getConnectedDevices("videoinput");
      const mics = await getConnectedDevices("audioinput");
      setCameras(
        cameras.map((camera) => {
          return { label: camera.label, value: camera.deviceId };
        }),
      );
      setMics(
        mics.map((mic) => {
          return { label: mic.label, value: mic.deviceId };
        }),
      );

      return newStream;
    } catch (err) {
      console.log("Permission error:", err.message);
      return null;
    }
  };

  useEffect(() => {
    const init = async () => {
      await getPermission();
    };

    const handleDeviceChange = async () => {
      const cameras = await getConnectedDevices("videoinput");
      const mics = await getConnectedDevices("audioinput");

      setCameras(
        cameras.map((camera) => {
          return { label: camera.label, value: camera.deviceId };
        }),
      );

      setMics(
        mics.map((mic) => {
          return { label: mic.label, value: mic.deviceId };
        }),
      );
    };

    init();

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange,
      );
    };
  }, []);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleCameraChange = async (deviceId) => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: { exact: deviceId },
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30, max: 60 },
        },
      });

      const oldAudioTrack = stream?.getAudioTracks()[0];
      const updatedStream = new MediaStream();

      updatedStream.addTrack(newStream.getVideoTracks()[0]);
      if (oldAudioTrack) {
        updatedStream.addTrack(oldAudioTrack);
      }

      stream?.getVideoTracks().forEach((track) => track.stop());

      newStream.getVideoTracks()[0].enabled = cameraEnabled;
      setStream(updatedStream);
      setSelectedCamera(deviceId);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleMicChange = async (deviceId) => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: { exact: deviceId },
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      });

      const newAudioTrack = newStream.getAudioTracks()[0];

      const oldVideoTrack = stream?.getVideoTracks()[0];
      const oldAudioTrack = stream?.getAudioTracks()[0];

      const updatedStream = new MediaStream();

      if (oldVideoTrack) {
        updatedStream.addTrack(oldVideoTrack);
      }

      oldAudioTrack.stop();

      updatedStream.addTrack(newAudioTrack);

      newAudioTrack.enabled = micEnabled;

      setStream(updatedStream);
      setSelectedMic(deviceId);
    } catch (err) {
      console.log(err.message);
    }
  };

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
    <div className="h-screen w-full overflow-hidden p-3 pb-0 sm:p-4">
      <div className="flex h-full flex-col items-around justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="h-full w-auto">
            <img className="h-8 w-8" src={info} alt="" />
          </div>
          <div className="text-white font-bold">{id}</div>
          <div>
            <span> | </span>
          </div>
          <Time />
        </div>
        <VideoTile
        cameraEnabled={cameraEnabled}
        videoRef={videoRef}
        />
        <CallControl
          cameras={cameras}
          mics={mics}
          selectedCamera={selectedCamera}
          selectedMic={selectedMic}
          cameraEnabled={cameraEnabled}
          micEnabled={micEnabled}
          stream={stream}
          getPermission={getPermission}
          onCameraChange={handleCameraChange}
          onMicChange={handleMicChange}
          onCameraEnabledChange={setCameraEnabled}
          onMicEnabledChange={setMicEnabled}
          onJoin={endCall}
          onEnd={endCall}
        />
      </div>
    </div>
  );
}
