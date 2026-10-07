import { useNavigate } from "react-router";
import meetIlus from "../assets/meetingilustrator.svg";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen pt-20 w-full text-zinc-100 font-sans overflow-hidden flex flex-col">
      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-6 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full h-full max-h-[800px] py-4">
          <div className="flex flex-col gap-6 lg:gap-8 text-center lg:text-left order-2 lg:order-1 h-full justify-center">
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 w-fit mx-auto lg:mx-0">
                <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                Secure, high-quality connections
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                Video meetings <br />
                <span className="text-zinc-500">made beautifully simple.</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Connect with your team, friends, and family instantly. No
                downloads required. Experience crystal-clear audio and HD video
                directly from your browser.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center relative order-1 lg:order-2 h-full max-h-[30vh] sm:max-h-[40vh] lg:max-h-full min-h-0">
            <img
              className="w-full h-full object-contain  opacity-80"
              src={meetIlus}
              alt="Seamless Video Meetings"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
