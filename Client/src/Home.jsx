import { Button } from "./components/ui/button";
import { Field } from "./components/ui/field";
import { Input } from "./components/ui/input";
import { Navigate, useNavigate } from "react-router";
import Navbar from "./Navbar";
import meetlogo from "./assets/google-meet.svg";
import pluslogo from "./assets/plus.svg";
import meetIlus from "./assets/meetingilustrator.svg";
import { useState, startTransition, useEffect } from "react";
import { Spotify } from "./components/Spotify";
import Media from "./components/Media";
import { useAuth } from "./AuthContext";



export default function Home() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("null");
  const [generatedId, setGeneratedId] = useState("xxxxxxxxxxx");
  const {isAuthenticated} = useAuth();

  const handleClick = (e) => {
    const page = e.target.name;
    console.log(page);

    navigate(`/${page}`);
  };

  const handleMode = (e) => {
    const mode = e.currentTarget.name;
    console.log(mode);

    startTransition(() => {
      setMode(mode);
    });
  };

  return (
    <>
      <div className="min-h-screen w-full ">
        <div className="pt-20">
          <div className="flex h-100 w-full p-4">
            <div className="flex-1 flex flex-col justify-start gap-10 p-4 border-r text-center">
              <h1 className="min-h-12 text-4xl font-extrabold">
                Join/Create Meeting
              </h1>
              <div className="flex h-28 shrink-0 justify-center items-start gap-10">
                <div>
                  <button
                    type="button"
                    onClick={handleMode}
                    name="meet"
                    aria-label="New Meeting"
                    className="block w-20 rounded-2xl bg-white hover:bg-white/80 select-none transition-all duration-75 ease-out active:translate-y-1 active:border-b-0 focus:outline-none"
                  >
                    <img className="h-auto w-full p-2" src={meetlogo} alt="" />
                  </button>
                  <p className="text-xs text-center leading-8">New Meeting</p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleMode}
                    name="join"
                    aria-label="Join Meeting"
                    className="block w-20 rounded-2xl bg-white hover:bg-white/80 select-none transition-all duration-75 ease-out active:translate-y-1 active:border-b-0 focus:outline-none"
                  >
                    <img className="h-auto w-full p-2" src={pluslogo} alt="" />
                  </button>
                  <p className="text-xs text-center leading-8">Join</p>
                </div>
              </div>
              <div className="h-50 w-full ">
                <div
                  className={`flex flex-col h-full w-full justify-center items-center gap-8`}
                >
                  <div
                    className={
                      mode == "null"
                        ? "flex justify-center items-center gap-4"
                        : "hidden"
                    }
                  >
                    <img
                      className="h-50 w-auto"
                      src={meetIlus}
                      alt="Ilustration"
                    />
                    <div className="flex flex-col justify-center items-center text-4xl font-black font-[Alter] leading-13">
                      <span className="bg-blue-800 px-4">
                        {" "}
                        Start or Join a{" "}
                      </span>
                      <span className="bg-blue-800">meeting in one</span>
                      <span className="bg-blue-800">click</span>
                    </div>
                  </div>
                  <div className="">
                    {mode == "join" && (
                      <div className="w-full">
                        <Field orientation="horizontal">
                          <Input
                            type="search"
                            placeholder="Enter Unique Id..."
                          />
                          <Button>Join</Button>
                        </Field>
                      </div>
                    )}{" "}
                    {mode == "meet" && (
                      <div className="w-full flex flex-col items-center">
                        <div className="flex gap-8">
                          <Button>Generate New ID</Button>
                          <Button>Use Personal ID</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 flex justify-center items-center">
              {/* <iframe
                data-testid="embed-iframe"
                src="https://open.spotify.com/embed/playlist/2oao4jid9qgiKd0f7upIUj?utm_source=generator&si=308c609b77c34f8e"
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
