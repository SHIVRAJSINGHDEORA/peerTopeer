import MediaSelector from "./MediaSelector";
import webcam from "../assets/video-solid-full.svg";
import webcamOff from "../assets/video-slash-solid-full.svg";
import mic from "../assets/microphone-solid-full.svg";
import micOff from "../assets/microphone-slash-solid-full.svg";
import phone from "../assets/phone-solid-full.svg";
import { useMedia } from "@/MediaContext";

export function CallControl({onJoin,onEnd}) {
  const {
    cameras,
    mics,
    selectedCamera,
    selectedMic,
    cameraEnabled,
    micEnabled,
    stream,
    getPermission,
    setCameraEnabled,
    setMicEnabled,
    handleCameraChange,
    handleMicChange,
  } = useMedia();

  const toggleCamera = async () => {
    if (!stream) {
      const newStream = await getPermission();
      if (!newStream) return;
      newStream.getVideoTracks().forEach((track) => {
        track.enabled = true;
      });
      setCameraEnabled(true);
      return;
    }
    const newEnabled = !cameraEnabled;

    stream.getVideoTracks().forEach((track) => {
      track.enabled = newEnabled;
    });

    setCameraEnabled(newEnabled);
  };

  const toggleMic = async () => {
    if (!stream) {
      const newStream = await getPermission();
      if (!newStream) return;
      newStream.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });
      setMicEnabled(true);
      return;
    } else {
      const newEnabled = !micEnabled;

      stream.getAudioTracks().forEach((track) => {
        track.enabled = newEnabled;
      });

      setMicEnabled(newEnabled);
    }
  };

  return (
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
          onClick={toggleMic}
          name="meet"
          aria-label={micEnabled ? "Turn microphone off" : "Turn microphone on"}
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
          onClick={toggleCamera}
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
          onClick={onJoin}
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
          onClick={onEnd}
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
  );
}
