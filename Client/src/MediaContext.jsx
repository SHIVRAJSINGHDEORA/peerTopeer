import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const MediaContext = createContext();

export function MediaProvider({ children }) {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [selectedMic, setSelectedMic] = useState("");
  const [mics, setMics] = useState([]);
  const [stream, setStream] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const constraints = {
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
    video: {
      width: { min: 640, ideal: 1280, max: 1920 },
      height: { min: 480, ideal: 720, max: 1080 },
      frameRate: { ideal: 30, max: 60 },
      facingMode: "user",
    },
  };

  const getConnectedDevices = async (type) => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind == type);
  };

  const getPermission = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({video : true,audio : true});
      setStream(newStream);

      const videoTrack = newStream.getVideoTracks()[0];
      const audioTrack = newStream.getAudioTracks()[0];
      const defaultCamera = videoTrack.getSettings().deviceId;
      const defaultMic = audioTrack.getSettings().deviceId;

      setSelectedCamera(defaultCamera);
      setSelectedMic(defaultMic);

      newStream.getVideoTracks().forEach((track) => {
        track.enabled = false;
      });

      newStream.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });

      const cameras = await getConnectedDevices("videoinput");
      const mics = await getConnectedDevices("audioinput");

      setCameras(
        cameras.map((camera) => {
          return { value: camera.deviceId, label: camera.label };
        }),
      );

      setMics(
        mics.map((mic) => {
          return { value: mic.deviceId, label: mic.label };
        }),
      );

      return newStream;
    } catch (err) {
      console.log("Permission Error : ", err);
      return null;
    }
  };

  useEffect(() => {
    const init = async () => {
      await getPermission();
    };

    const handleDeviceChange = async () => {
      const cameras = await getConnectedDevices("videoinput");
      const mics = await getConnectedDevices("audioinput");

      setCameras(
        cameras.map((camera) => {
          return { label: camera.label, value: camera.deviceId };
        }),
      );

      setMics(
        mics.map((mic) => {
          return { label: mic.label, value: mic.deviceId };
        }),
      );
    };

    init();

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange,
      );
    };
  }, []);

  const handleCameraChange = async (deviceId) => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: { exact: deviceId },
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30, max: 60 },
        },
      });

      const oldAudioTrack = stream?.getAudioTracks()[0];
      const updatedStream = new MediaStream();

      updatedStream.addTrack(newStream.getVideoTracks()[0]);
      if (oldAudioTrack) {
        updatedStream.addTrack(oldAudioTrack);
      }

      stream?.getVideoTracks().forEach((track) => track.stop());

      newStream.getVideoTracks()[0].enabled = cameraEnabled;
      setStream(updatedStream);
      setSelectedCamera(deviceId);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleMicChange = async (deviceId) => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: { exact: deviceId },
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      });

      const newAudioTrack = newStream.getAudioTracks()[0];

      const oldVideoTrack = stream?.getVideoTracks()[0];
      const oldAudioTrack = stream?.getAudioTracks()[0];

      const updatedStream = new MediaStream();

      if (oldVideoTrack) {
        updatedStream.addTrack(oldVideoTrack);
      }

      oldAudioTrack?.stop();

      updatedStream.addTrack(newAudioTrack);

      newAudioTrack.enabled = micEnabled;

      setStream(updatedStream);
      setSelectedMic(deviceId);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <MediaContext.Provider
      value={{
        cameras,
        selectedCamera,
        mics,
        selectedMic,
        getPermission,
        stream,
        setStream,
        cameraEnabled,
        micEnabled,
        setCameraEnabled,
        setMicEnabled,
        handleCameraChange,
        handleMicChange,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  return useContext(MediaContext);
}
