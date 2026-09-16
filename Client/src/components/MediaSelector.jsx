import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

export default function MediaSelector({
  devices,
  selectedDevice,
  onMediaChange,
  disabled,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedDeviceObj = devices.find(
    (device) => device.value == selectedDevice,
  );

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (!disabled) setIsOpen(nextOpen);
      }}
    >
      <DropdownMenuTrigger
        render={
          <button
            disabled={disabled}
            className="flex items-center justify-center group h-14 w-14 rounded-2xl border-none  transition-all  disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Open camera selector"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>
        }
      />

      <DropdownMenuContent
        align="start"
        className="mb-2 w-65 rounded-4xl border border-zinc-700 bg-zinc-950 p-2 shadow-2xl"
      >
        <Select
          disabled={disabled}
          value={selectedDevice}
          onValueChange={onMediaChange}
        >
          <SelectTrigger className="w-full rounded-xl border-zinc-700 bg-zinc-900 text-white">
            <SelectValue placeholder="Select device">
              {selectedDeviceObj?.label || "Select device"}{" "}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="w-full bg-zinc-900 text-white">
            <SelectGroup>
              {devices.length ? (
                devices.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>
                  No cameras found
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
