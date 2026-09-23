import meetIlus from "../assets/meetingilustrator.svg";

export function VideoTile({videoRef,cameraEnabled}) {
  return (
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
  );
}
