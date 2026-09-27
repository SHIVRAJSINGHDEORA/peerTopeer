import { useRef, useEffect } from "react";
import meetIlus from "../assets/meetingilustrator.svg";

export function VideoTile({
  stream,
  cameraEnabled = true,
  isLocal = false,
  name = "Participant",
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (stream && cameraEnabled) {
      videoEl.srcObject = stream;
      videoEl.play().catch((err) => {
        if (err.name !== "AbortError") console.error("Playback error:", err);
      });
    } else {
      videoEl.srcObject = null;
    }

    return () => {
      if (videoEl) videoEl.srcObject = null;
    };
  }, [stream, cameraEnabled]);

  // Derived display flags
  const isConnecting = cameraEnabled && !stream;
  const isCameraOff = !cameraEnabled;
  const isLive = cameraEnabled && !!stream;

  return (
    <div className="flex h-full w-full items-center justify-center p-2">
      <div className="relative aspect-video  max-h-full w-full max-w-3xl overflow-hidden rounded-3xl border-8 border-zinc-800 bg-zinc-900 shadow-2xl">
        
        {/* 1. Hardware Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          controls={false}
          className={`h-full w-full rounded-2xl object-cover transition-opacity duration-200 ${
            isLive ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        {/* 2. Connecting State (Camera is ON, but stream track is still null) */}
        {isConnecting && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-zinc-900 text-zinc-400">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-blue-500" />
            <span className="text-xs font-medium tracking-wide text-zinc-300">
              Connecting video...
            </span>
          </div>
        )}

        {/* 3. Camera Off State */}
        {isCameraOff && (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl bg-zinc-900 p-4">
            <img
              className="h-auto max-h-[70%] w-auto max-w-[70%] select-none object-contain"
              src={meetIlus}
              alt="Camera is off illustration"
            />
          </div>
        )}

        {/* Participant Name Badge */}
        {name && (
          <span className="absolute bottom-4 left-4 z-10 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {name} {isLocal && "(You)"}
          </span>
        )}

      </div>
    </div>
  );
}