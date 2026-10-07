import { useNavigate } from "react-router";
import supportIlus from "../assets/supportIlus.svg";

export default function SupportPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full pt-20 text-zinc-100 font-sans overflow-hidden flex flex-col">
      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-6 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full h-full max-h-[800px] py-4">
          <div className="flex flex-col gap-4 lg:gap-6 text-center lg:text-left order-2 lg:order-1 h-full justify-center">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.1]">
                We're here <br />
                <span className="text-zinc-500">to help.</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Facing an issue with your camera? Have a feature request? Reach
                out directly to our team.
              </p>
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0 mt-2">
              <div className="flex flex-col gap-3 w-full">
                <a
                  href="mailto:shivrajsinghdeora823@gmail.com"
                  className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-colors rounded-xl px-5 py-4 w-full group"
                >
                  <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white">Email</span>
                    <span className="text-xs text-zinc-400">
                      shivrajsinghdeora823@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/shivraj-singh-deora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-colors rounded-xl px-5 py-4 w-full group"
                >
                  <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white">
                      LinkedIn
                    </span>
                    <span className="text-xs text-zinc-400">
                      Connect with me
                    </span>
                  </div>
                </a>

                <a
                  href="https://github.com/SHIVRAJSINGHDEORA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-colors rounded-xl px-5 py-4 w-full group"
                >
                  <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white">GitHub</span>
                    <span className="text-xs text-zinc-400">
                      View my projects
                    </span>
                  </div>
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-900 text-left"></div>
            </div>
          </div>

          <div className="flex items-center justify-center relative order-1 lg:order-2 h-full max-h-[20vh] sm:max-h-[30vh] lg:max-h-full min-h-0">
            <img
              className="w-full h-full object-contain opacity-80"
              src={supportIlus}
              alt="Support Illustration"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
