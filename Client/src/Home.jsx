import { Button } from "./components/ui/button";
import { Field } from "./components/ui/field";
import { Input } from "./components/ui/input";
import { useNavigate } from "react-router";
import meetlogo from "./assets/google-meet.svg";
import fileShareIlus from "./assets/fileShareIlus.svg";
import pluslogo from "./assets/plus.svg";
import meetIlus from "./assets/meetingilustrator.svg";
import { useState, startTransition, useEffect } from "react";
import axios from "axios";
import { showToast } from "./components/customToast";

export default function Home() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("null");
  const [joinId, setJoinId] = useState("");
  const API_URL = import.meta.env.VITE_SERVER_URL;


  const handleChange = (e) => {
    setJoinId(e.target.value);
  };

  const handleMode = (e) => {
    const mode = e.currentTarget.name;
    console.log(mode);

    startTransition(() => {
      setMode(mode);
    });
  };

  const handleCreateMeet = async () => {
    try {
      const { data } = await axios.post(
        `${API_URL}/video-call/meetings`,
        {},
        { withCredentials: true },
      );
      console.log(data);
      const { id } = data;
      navigate(`/video-call/setup/${id}`);
    } catch (err) {
      console.log(err.message);
      handleError(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleError = (err) => {
    showToast(err, "error", "top-right");
  };

  const handleJoinMeet = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/video-call/${joinId}`,
        {
          withCredentials: true,
        },
      );

      console.log(data);
      const { meetId } = data;
      navigate(`/video-call/setup/${meetId}`);
    } catch (err) {
      console.log(err.message);
      handleError(err.response?.data?.message || "Something went wrong!");
    }
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
                            type="text"
                            placeholder="Enter Unique Id..."
                            value={joinId}
                            onChange={handleChange}
                          />
                          <Button onClick={handleJoinMeet}>Join</Button>
                        </Field>
                      </div>
                    )}{" "}
                    {mode == "meet" && (
                      <div className="w-full flex flex-col items-center">
                        <div className="flex gap-8">
                          <Button onClick={handleCreateMeet}>
                            Generate New ID
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 flex justify-center items-center">
              <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 relative order-1 lg:order-2 h-full max-h-[25vh] sm:max-h-[35vh] lg:max-h-full min-h-0 w-full">
                <img
                  className="w-full flex-1 min-h-0 object-contain opacity-80"
                  src={fileShareIlus}
                  alt="Illustration"
                />

                <div className="shrink-0 flex items-start sm:items-center gap-3 sm:gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-3 sm:p-4 w-full max-w-sm">
                  <div className="p-2 sm:p-3 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  <div className="flex flex-col text-left justify-center">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-white leading-none">
                        File Sharing
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-black bg-white text-[9px] font-extrabold uppercase tracking-widest leading-none">
                        Soon
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs text-zinc-400 leading-tight">
                      Share documents and images securely during your meetings.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
