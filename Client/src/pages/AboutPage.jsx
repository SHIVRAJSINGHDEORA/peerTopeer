import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import meetlogo from "../assets/google-meet.svg";
import aboutIlus from "../assets/aboutIlus.svg"; // Download from IconScout

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen pt-20 w-full  text-zinc-100 font-sans overflow-hidden flex flex-col">
      

      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-6 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full h-full max-h-[800px] py-4">
          
          <div className="flex flex-col gap-6 lg:gap-8 text-center lg:text-left order-2 lg:order-1 h-full justify-center">
            <div className="space-y-4 lg:space-y-6"> 
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Built for <br />
                <span className="text-zinc-500">real connection.</span>
              </h1>
              
              <div className="space-y-4 text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed text-left">
                <p>
                  PeerToPeer was built on a simple idea: video conferencing shouldn't be complicated, slow, or expensive. 
                </p>
                <p>
                  Created by <strong className="text-white">{"SHIVRAJ SINGH DEORA"}</strong>, this platform leverages modern WebRTC technology to connect devices directly to each other, cutting out the middlemen and ensuring your conversations stay fast and secure.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full pt-4">
              <Button onClick={() => navigate('/support')} className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-zinc-100 rounded-xl px-8 py-6 text-base font-medium border border-zinc-800 transition-transform active:scale-95">
                Contact Us
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center relative order-1 lg:order-2 h-full max-h-[25vh] sm:max-h-[40vh] lg:max-h-full min-h-0">
            <img className="w-full h-full object-contain opacity-80" src={aboutIlus} alt="About Illustration" />
          </div>
        </div>
      </main>
    </div>
  );
}