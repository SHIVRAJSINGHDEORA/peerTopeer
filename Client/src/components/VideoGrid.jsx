import { useMedia } from "@/MediaContext";
import { VideoTile } from "./VideoTile";
import { useEffect, useRef, memo, useState,useCallback } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function ThumbnailVideo({ stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !stream) return;

    // Only assign if the source actually changed to avoid buffer resets
    if (videoEl.srcObject !== stream) {
      videoEl.srcObject = stream;
    }

    videoEl.play().catch((err) => {
      if (err.name !== "AbortError") console.error(err);
    });

    return () => {
      if (videoEl) videoEl.srcObject = null;
    };
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="h-full w-full rounded-xl object-cover"
    />
  );
}

const ParticipantsThumbnail = memo(function participantsThumbnainl({
  isActive,
  participant,
  muted = false,
  onSelect
}) {
  const videoRef = useRef(null);
  const id = participant.id;
  const cameraEnabled = participant.cameraEnabled;
  const stream = participant.stream;

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const isLive = cameraEnabled && !!stream;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black" onClick={()=>onSelect(id)}>
      {isActive || !isLive ? (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 bg-purple-500/40 blur-3xl" />
          <div className="relative flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-xs font-semibold text-white">
              {id.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-white">{id}</span>
          </div>
        </div>
      ) : (
        <ThumbnailVideo stream={stream}/>
      )}
    </div>
  );
});

export function VideoGrid({ user, host,participants }) {
  const [activeUserId, setActiveUserId] = useState(null);

  useEffect(() => {
    if (!activeUserId && (host?.id || user?.id)) {
      setActiveUserId(host?.id ?? user?.id);
    }
  }, [host?.id, user?.id, activeUserId]);

  const currentTargetId = activeUserId ?? host?.id ?? user?.id;
  const activeUser =
    participants.find((p) => p.id === currentTargetId) || participants[0];

  const handleSelect = useCallback((id) => {
    setActiveUserId(id);
  }, []);

  return (
    <div className="flex flex-1 h-full  min-h-0 flex-col gap-2 sm:gap-4 lg:flex-row">
      <div className="relative flex-1 min-h-0 min-w-0 w-full h-full overflow-hidden rounded-2xl">
        <VideoTile
          cameraEnabled={activeUser?.cameraEnabled}
          stream={activeUser?.stream}
          isLocal={activeUser?.id == user.id}
          name={activeUser?.id}
        />
      </div>

      <ScrollArea className=" w-max max-w-full self-center shrink-0 rounded-2xl overflow-hidden bg-zinc-800 lg:h-full lg:w-55">
        <div className="flex flex-row gap-2 px-4 py-2 lg:w-full lg:flex-col">
          {participants.map((participant, index) => (
            <div
              key={index}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ${participant.id == activeUser.id ? "border-2 border-yellow-500/60" : ""} bg-zinc-950 p-1 sm:h-24 sm:w-24 lg:h-28 lg:w-full lg:p-2`}
            >
              <ParticipantsThumbnail
                participant={participant}
                isActive={participant.id == activeUser.id}
                onSelect={handleSelect}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="lg:hidden" />
      </ScrollArea>
    </div>
  );
}
