import { useMedia } from "@/MediaContext";
import { VideoTile } from "./VideoTile";
import { useEffect, useRef } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Adjust path if needed

function Video({ stream, muted = false }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        controls={false}
        className="absolute inset-0 h-full w-full rounded-2xl object-cover"
      />
    </div>
  );
}

export function VideoGrid() {
  const { cameraEnabled, stream } = useMedia();

  const participants = [
    { id: 1, stream: stream },
    { id: 2, stream: stream },
    { id: 3, stream: stream },
    { id: 4, stream: stream },
    { id: 2, stream: stream },
    { id: 3, stream: stream },
    { id: 4, stream: stream },
  ];

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="flex h-[calc(100vh-10rem)] w-full min-h-0 flex-col gap-4 lg:flex-row">
      
      {/* Main Video Tile */}
      <div className="min-w-0 flex-1 lg:min-h-0">
        <VideoTile cameraEnabled={cameraEnabled} videoRef={videoRef} />
      </div>

      {/* Shadcn ScrollArea Wrapper */}
      <ScrollArea className="w-full shrink-0 rounded-2xl overflow-hidden bg-zinc-800 lg:h-full lg:w-[220px]">
        {/* Inner layout container controls the flex direction */}
        <div className="flex w-full flex-row gap-2 px-4 py-2 lg:flex-col">
          {participants.map((participant, index) => (
            <div
              key={`${participant.id}-${index}`}
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-zinc-950 p-1 sm:h-28 sm:w-28 lg:h-28 lg:w-full lg:p-2"
            >
              <Video stream={participant.stream} />
            </div>
          ))}
        </div>
        
        {/* Radix/Shadcn requires explicit horizontal scrollbars if you want dual-axis routing */}
        <ScrollBar orientation="horizontal" className="lg:hidden" />
      </ScrollArea>
      
    </div>
  );
}