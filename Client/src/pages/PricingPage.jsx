import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import pricingIlus from "../assets/pricingIlus.svg";

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen pt-20 w-full text-zinc-100 font-sans overflow-hidden flex flex-col">
      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-6 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full h-full max-h-[800px] py-4">
          <div className="flex flex-col gap-6 lg:gap-8 text-center lg:text-left order-2 lg:order-1 h-full justify-center">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Free forever. <br />
                <span className="text-zinc-500">No hidden limits.</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                We believe high-quality communication should be accessible to
                everyone. That is why our core features are completely free.
              </p>
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0 border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 text-left">
              <h3 className="text-xl font-bold text-white ">
                Basic Plan{" "}
                <span className="text-zinc-500 font-normal ml-2">$0/mo</span>
              </h3>
              <ul className="space-y-3 mt-2">
                <li className="flex items-center gap-3 text-zinc-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>{" "}
                  Unlimited 1:1 Meetings
                </li>
                <li className="flex items-center gap-3 text-zinc-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span> Up
                  to 100 participants per group
                </li>
                <li className="flex items-center gap-3 text-zinc-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span> HD
                  Video & Crystal Clear Audio
                </li>
                <li className="flex items-center gap-3 text-zinc-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>{" "}
                  End-to-End Encryption
                </li>
              </ul>
              <Button
                onClick={() => navigate("/signup")}
                className="w-full mt-2 bg-white hover:bg-zinc-200 text-black rounded-xl py-4 text-sm font-bold"
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center relative order-1 lg:order-2 h-full max-h-[25vh] sm:max-h-[40vh] lg:max-h-full min-h-0">
            <img
              className="w-full h-full object-contain opacity-80"
              src={pricingIlus}
              alt="Pricing Illustration"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
