import { useNavigate, useParams } from "react-router";
import Media from "./components/Media";
import MediaSelector from "./components/MediaSelector";
import { useEffect, useRef, useState } from "react";
import { Button } from "./components/ui/button";
import webcam from "./assets/video-solid-full.svg";
import webcamOff from "./assets/video-slash-solid-full.svg";
import mic from "./assets/microphone-solid-full.svg";
import micOff from "./assets/microphone-slash-solid-full.svg";
import phone from "./assets/phone-solid-full.svg"
import meetIlus from "./assets/meetingilustrator.svg";
import info from "./assets/info2.svg"
import Time from "./Time";

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
      navigator.mediaDevices.addEventListener(
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

  const togleCamera = async () => {
    if (!stream) {
      const newStream = await getPermission();
      if (!newStream) return;
      return;
    }
    const newEnabled = !cameraEnabled;

    stream.getVideoTracks().forEach((track) => {
      track.enabled = newEnabled;
    });

    setCameraEnabled(newEnabled);
  };

  const togleMic = async () => {
    if (!stream) {
      const newStream = await getPermission();
      if (!newStream) return;
      return;
    } else {
      const newEnabled = !micEnabled;

      stream.getAudioTracks().forEach((track) => {
        track.enabled = newEnabled;
      });

      setMicEnabled(newEnabled);
    }
  };

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

      stream?.getVideoTracks().forEach((track) => track.stop());

      setStream(newStream);
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

      stream?.getVideoTracks().forEach((track) => track.stop());

      const oldVideoTrack = stream?.getVideoTracks()[0];

      const updatedStream = new MediaStream();

      if (oldVideoTrack) {
        updatedStream.addTrack(oldVideoTrack);
      }

      updatedStream.addTrack(newAudioTrack);

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

    navigate("/")
  }
};

  return (
    <div className="h-screen w-full overflow-hidden p-3 pb-0 sm:p-4">
      <div className="flex h-full flex-col items-around justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="h-full w-auto"><img className="h-8 w-8" src={info} alt="" /></div>
          <div className="text-white font-bold">{id}</div>
          <div><span> | </span></div>
          <Time/>
        </div>
        <div className="flex w-full  items-center justify-center">
          <div className="relative w-full max-w-3xl aspect-video max-h-[calc(100vh-11rem)] overflow-hidden rounded-3xl border-8 border-zinc-800 bg-zinc-800 p-2 shadow-xl">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              controls={false}
              className={`absolute inset-0 h-full w-full rounded-2xl object-cover ${cameraEnabled ? "block" : "hidden"}`}
            />
            <div
              className={
                cameraEnabled
                  ? "hidden"
                  : "flex h-full w-full items-center justify-center rounded-2xl"
              }
            >
              <img
                className="h-auto max-h-[70%] w-auto max-w-[70%] object-contain"
                src={meetIlus}
                alt="Ilustration"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div
            className={`flex items-center bg-zinc-800  ${micEnabled ? "rounded-2xl" : "rounded-full"}`}
          >
            <MediaSelector
              devices={mics}
              selectedDevice={selectedMic}
              onMediaChange={handleMicChange}
              disabled={!stream || !micEnabled}
            />
            <button
              type="button"
              onClick={togleMic}
              name="meet"
              aria-label={micEnabled ? "Turn camera off" : "Turn camera on"}
              aria-pressed={micEnabled}
              className={`flex h-14 w-14 items-center justify-center  border-2 border-white/10 shadow-lg transition-all duration-200 ease-out active:scale-95 focus:outline-none ${
                micEnabled
                  ? "bg-zinc-950 text-zinc-900 hover:bg-zinc-950/80 rounded-2xl"
                  : "bg-[#6d2b2b] text-white hover:bg-[#7a2f2f] rounded-full"
              }`}
            >
              <img
                className="h-8 w-8 object-contain"
                src={micEnabled ? mic : micOff}
                alt=""
              />
            </button>
          </div>
          <div
            className={`flex items-center bg-zinc-800  ${cameraEnabled ? "rounded-2xl" : "rounded-full"}`}
          >
            <MediaSelector
              devices={cameras}
              selectedDevice={selectedCamera}
              onMediaChange={handleCameraChange}
              disabled={!stream || !cameraEnabled}
            />
            <button
              type="button"
              onClick={togleCamera}
              name="meet"
              aria-label={cameraEnabled ? "Turn camera off" : "Turn camera on"}
              aria-pressed={cameraEnabled}
              className={`flex h-14 w-14 items-center justify-center  border-2 border-white/10 shadow-lg transition-all duration-200 ease-out active:scale-95 focus:outline-none ${
                cameraEnabled
                  ? "bg-zinc-950 text-zinc-900 hover:bg-zinc-950/80 rounded-2xl"
                  : "bg-[#6d2b2b] text-white hover:bg-[#7a2f2f] rounded-full"
              }`}
            >
              <img
                className="h-8 w-8 object-contain"
                src={cameraEnabled ? webcam : webcamOff}
                alt=""
              />
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={endCall}
              name="meet"
              className="flex h-14 w-20 items-center justify-center  
              border-4 border-white bg-blue-600 rounded-full shadow-lg transition-all duration-200 
              ease-out active:scale-95 focus:outline-none"
            >
              <span className="text-white text-xl font-extrabold">Join</span>
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={endCall}
              name="meet"
              className="flex h-14 w-20 items-center justify-center  
              border-2 border-white/10 bg-red-600 rounded-full shadow-lg transition-all duration-200 
              ease-out active:scale-95 focus:outline-none"
            >
              <img
                className="h-8 w-8 rotate-135 object-contain"
                src={phone}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
