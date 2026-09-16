import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Media() {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    const handleDeviceChange = async () => {
      const cameras = await getConnectedDevices("videoinput");

      setCameras(
        cameras.map((camera) => {
          return { label: camera.label, value: camera.deviceId };
        }),
      );
    };

    const init = async () => {
      const constraints = { video: true, audio: true };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(stream);

      const cameras = await getConnectedDevices("videoinput");

      setCameras(
        cameras.map((camera) => {
          return { label: camera.label, value: camera.deviceId };
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

  const getConnectedDevices = async (type) => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return (await devices).filter((device) => device.kind == type);
  };

  return (
    <>
      <div className="w-full">
        <Select cameras={cameras}>
          <SelectTrigger className="w-80">
            <SelectValue placeholder="Select Camera" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {cameras.map((item) => (
                <SelectItem key={item.label} value={item.label}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
