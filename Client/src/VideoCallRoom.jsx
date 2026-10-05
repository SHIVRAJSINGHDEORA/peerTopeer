import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CallControl } from "./components/CallControl";
import Time from "./components/Time";
import { VideoGrid } from "./components/VideoGrid";
import { showToast } from "./components/customToast";
import { useMedia } from "./MediaContext";
import { useSocket } from "./SocketContext";
import info from "./assets/info2.svg";

export default function VideoCallRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [meetData, setMeetData] = useState({ Id: "", user: "", host: "" });
  const [participants, setParticipants] = useState([]);
  
  const { stream, stopMedia, cameraEnabled } = useMedia();
  const { socket } = useSocket();
  const { Id, user, host } = meetData;

  
  const peerConnections = useRef(new Map());
  const hasJoinedRoom = useRef(false);
  
  
  const streamRef = useRef(stream);
  const cameraRef = useRef(cameraEnabled);

  useEffect(() => {
    streamRef.current = stream;
    cameraRef.current = cameraEnabled;
  }, [stream, cameraEnabled]);

  
  useEffect(() => {
    const getMeet = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/video-call/${id}`, { 
          withCredentials: true 
        });
        setMeetData({ Id: data.meetId, user: data.user, host: data.host });
      } catch (err) {
        showToast(err.response?.data?.message || "Something went wrong!", "error", "top-right");
        navigate("/home");
      }
    };
    getMeet();
  }, [id, navigate]);

 
  useEffect(() => {
    if (!socket || !user) return;
    setParticipants((prev) => {
      const filtered = prev.filter((p) => p.socketId !== socket.id);
      return [{ socketId: socket.id, id: user, cameraEnabled, stream }, ...filtered];
    });
  }, [socket, user, cameraEnabled, stream]);

 
  useEffect(() => {
    if (hasJoinedRoom.current && socket) {
      socket.emit("camera-toggle", { roomId: id, cameraEnabled });
    }
  }, [cameraEnabled, socket, id]);

  
  useEffect(() => {
    if (!stream || peerConnections.current.size === 0) return;
    
    const videoTrack = stream.getVideoTracks()[0];
    const audioTrack = stream.getAudioTracks()[0];

    peerConnections.current.forEach((pc) => {
      const senders = pc.getSenders();
      
      const videoSender = senders.find(s => s.track?.kind === "video");
      if (videoSender && videoTrack) videoSender.replaceTrack(videoTrack);
      
      const audioSender = senders.find(s => s.track?.kind === "audio");
      if (audioSender && audioTrack) audioSender.replaceTrack(audioTrack);
    });
  }, [stream]); 

  
  useEffect(() => {
    
    if (!socket || !user || !stream) return; 

    const createPeerConnection = (targetSocketId, targetUsername, isTargetCameraEnabled) => {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", { candidate: event.candidate, target: targetSocketId });
        }
      };

      pc.ontrack = (event) => {
        setParticipants((prev) => {
          const remoteStream = event.streams[0];
          const existing = prev.find((p) => p.socketId === targetSocketId);
          if (existing) {
            return prev.map((p) =>
              p.socketId === targetSocketId ? { ...p, stream: remoteStream } : p
            );
          }
          return [
            ...prev,
            { socketId: targetSocketId, id: targetUsername, cameraEnabled: isTargetCameraEnabled, stream: remoteStream },
          ];
        });
      };

     
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => pc.addTrack(track, streamRef.current));
      }

      peerConnections.current.set(targetSocketId, pc);
      return pc;
    };

    
    const handleNewUser = async ({ username, socketId }) => {
      const pc = createPeerConnection(socketId, username, false);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      
      socket.emit("offer", { offer, target: socketId, cameraEnabled: cameraRef.current }); 
    };

    const handleOffer = async ({ offer, from, userCamera, username }) => {
      const pc = createPeerConnection(from, username, userCamera);
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", { answer, target: from, cameraEnabled: cameraRef.current });
    };

    const handleAnswer = async ({ answer, from,userCamera }) => {
      const pc = peerConnections.current.get(from);
      if (pc) {
        await pc.setRemoteDescription(answer);

        setParticipants((prev)=>{
          return prev.map((p)=> p.socketId == from ? {...p, cameraEnabled : userCamera} : p)
        })
      }
    };

    const handleIceCandidate = async ({ candidate, from }) => {
      const pc = peerConnections.current.get(from);
      if (pc) await pc.addIceCandidate(candidate);
    };

    const handleCameraToggle = ({ socketId, isCameraEnabled }) => {
      setParticipants((prev) => 
        prev.map((p) => (p.socketId === socketId ? { ...p, cameraEnabled: isCameraEnabled } : p))
      );
    };

    const handleUserLeft = (socketId) => {
      const pc = peerConnections.current.get(socketId);
      if (pc) {
        pc.close();
        peerConnections.current.delete(socketId);
      }
      setParticipants((prev) => prev.filter((p) => p.socketId !== socketId));
    };

   
    socket.on("new-user", handleNewUser);
    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleIceCandidate);
    socket.on("camera-toggle", handleCameraToggle);
    socket.on("user-disconnected", handleUserLeft);

    
    if (!hasJoinedRoom.current) {
      socket.emit("join-room", id, () => {
        hasJoinedRoom.current = true;
      });
    }

     
    return () => {
      if (hasJoinedRoom.current) {
        socket.emit("leave-room", id);
      }
      
      peerConnections.current.forEach((pc) => pc.close());
      peerConnections.current.clear();
      hasJoinedRoom.current = false;

      socket.off("new-user", handleNewUser);
      socket.off("offer", handleOffer);
      socket.off("answer", handleAnswer);
      socket.off("ice-candidate", handleIceCandidate);
      socket.off("camera-toggle", handleCameraToggle);
      socket.off("user-disconnected", handleUserLeft);
    };
  }, [socket, user, id]); 

  const endCall = () => {
    stopMedia();
    navigate("/");
  };

  return (
    <div className="h-screen w-full p-3 pb-0 sm:p-4 lg:overflow-hidden">
      <div className="flex h-full flex-col items-around justify-between gap-2">
        <div className="flex items-center gap-4">
          <img className="h-8 w-8" src={info} alt="Info" />
          <div className="font-bold text-white">{Id}</div>
          <span className="text-white"> | </span>
          <Time />
        </div>
        <VideoGrid user={{ id: user }} host={{ id: host }} participants={participants} />
        <div className="shrink-0 pb-3 sm:pb-0">
          <CallControl onJoin={endCall} onEnd={endCall} />
        </div>
      </div>
    </div>
  );
}