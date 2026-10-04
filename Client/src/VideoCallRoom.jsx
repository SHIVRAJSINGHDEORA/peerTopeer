import { useNavigate, useParams } from "react-router";
import { CallControl } from "./components/CallControl";
import { useEffect, useRef, useState } from "react";
import info from "./assets/info2.svg";
import Time from "./components/Time";
import { VideoTile } from "./components/VideoTile";
import axios from "axios";
import { showToast } from "./components/customToast";
import { useMedia } from "./MediaContext";
import { VideoGrid } from "./components/VideoGrid";
import { useSocket } from "./SocketContext";

export default function VideoCallRoom() {
  const params = useParams();
  const id = params.id;
  const [meetData, setMeetData] = useState({ Id: "", user: "", host: "" });
  const navigate = useNavigate();
  const { stream, stopMedia, cameraEnabled } = useMedia();
  const { Id, user, host } = meetData;
  const {
    socket,
    newUser,
    incomingOffer,
    incomingAnswer,
    incomingIceCandidate,
  } = useSocket();
  const peerConnection = useRef(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const getMeet = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/video-call/${id}`,
          { withCredentials: true },
        );

        console.log(data);
        const { meetId, user, host } = data;
        setMeetData((prev) => ({
          ...prev,
          Id: meetId,
          user: user,
          host: host,
        }));
      } catch (err) {
        console.log(err.message);
        handleError(err.response?.data?.message || "Something went wrong!");
        navigate("/home");
      }
    };

    getMeet();

    return () => {
      socket?.emit("leave-room", id);
    };
  }, []);

  useEffect(() => {
    if (!stream) return;

    setParticipants((prev) => {
      const existing = prev.find((user) => user.socketId === socket?.id);

      if (existing) {
        return prev.map((u) =>
          u.socketId === socket.id
            ? {
                ...u,
                id: user,
                cameraEnabled: cameraEnabled,
                stream: stream,
              }
            : u,
        );
      }

      return [
        {
          socketId: socket.id,
          id: user,
          cameraEnabled: cameraEnabled,
          stream: stream,
        },
        ...prev,
      ];
    });
  }, [stream, socket, user, cameraEnabled]);

  useEffect(() => {
    if (!socket) return;
    if (!newUser) return;

    const handleUser = async (username, socketId) => {
      const configuration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      };

      peerConnection.current = new RTCPeerConnection(configuration);

      peerConnection.current.ontrack = (event) => {
        const remoteStream = event.streams[0];

        setParticipants((prev) => {
          const existing = prev.find((user) => user.socketId === socketId);

          if (existing) {
            return prev.map((user) =>
              user.socketId === socketId
                ? { ...user, stream: remoteStream }
                : user,
            );
          }

          return [
            ...prev,
            {
              socketId : socketId,
              id : username,
              cameraEnabled: false,
              stream: remoteStream,
            },
          ];
        });
      };

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            candidate: event.candidate,
            target: socketId,
          });
        }
      };

      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      socket.emit("offer", { offer, target: socketId, cameraEnabled });
    };

    handleUser(newUser);
  }, [socket, newUser]);

  useEffect(() => {
    if (!socket) return;
    if (!incomingOffer) return;

    const handleOffer = async ({ offer, from, userCamera, username }) => {
      console.log("from socket Id :", from);

      const confugration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      };

      peerConnection.current = new RTCPeerConnection(confugration);

      peerConnection.current.ontrack = (event) => {
        const remoteStream = event.streams[0];

        setParticipants((prev) => {
          const existing = prev.find((user) => user.socketId === from);

          if (existing) {
            return prev.map((user) =>
              user.socketId === from ? { ...user, stream: remoteStream } : user,
            );
          }

          return [
            ...prev,
            {
              socketId: from,
              id : username,
              cameraEnabled: userCamera,
              stream: remoteStream,
            },
          ];
        });
      };

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            candidate: event.candidate,
            target: from,
          });
        }
      };

      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });

      await peerConnection.current.setRemoteDescription(offer);
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      socket.emit("answer", { answer, target: from, cameraEnabled });
    };

    handleOffer(incomingOffer);
  }, [socket, incomingOffer]);

  useEffect(() => {
    if (!socket) return;
    if (!incomingAnswer) return;

    const handleAnswer = async ({ answer, from, userCamera, username }) => {
      await peerConnection.current.setRemoteDescription(answer);

      setParticipants((prev) => {
        const existing = prev.find((user) => user.socketId === from);

        if (existing) {
          return prev.map((user) =>
            user.socketId === from
              ? {
                  ...user,
                  id : username,
                  cameraEnabled: userCamera,
                }
              : user,
          );
        }

        return [
          ...prev,
          {
            socketId: from,
            id : username,
            cameraEnabled: userCamera,
            stream: null,
          },
        ];
      });
    };

    handleAnswer(incomingAnswer);
  }, [socket, incomingAnswer]);

  useEffect(() => {
    if (!socket) return;
    if (!incomingIceCandidate) return;

    const handleIceCandidate = async ({ candidate, from }) => {
      await peerConnection.current.addIceCandidate(candidate);
    };

    handleIceCandidate(incomingIceCandidate);
  }, [socket, incomingIceCandidate]);

  const handleError = (err) => {
    showToast(err, "error", "top-right");
  };

  const endCall = () => {
    stopMedia();
    navigate("/");
  };

  return (
    <div className="h-screen w-full lg:overflow-hidden p-3 pb-0 sm:p-4">
      <div className="flex h-full flex-col items-around justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="h-full w-auto">
            <img className="h-8 w-8" src={info} alt="" />
          </div>
          <div className="text-white font-bold">{Id}</div>
          <div>
            <span> | </span>
          </div>
          <Time />
        </div>
        <VideoGrid
          user={{ id: user }}
          host={{ id: host }}
          participants={participants}
        />
        <div className="shrink-0 pb-3 sm:pb-0">
          <CallControl onJoin={endCall} onEnd={endCall} />
        </div>
      </div>
    </div>
  );
}
