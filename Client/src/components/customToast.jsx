import { toast as sonnerToast } from "sonner";
import { Check, X } from "lucide-react";

export const showToast = (message, type = "success",position) => {
  sonnerToast.custom((id) => (
    <div className="flex w-full items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-lg ring-1 ring-black/5 md:max-w-77">
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {type === "success" ? (
          <Check className="h-5 w-5 text-white" />
        ) : (
          <X className="h-5 w-5 text-white" />
        )}
      </div>

      <p className="text-base font-medium text-gray-800">
        {message}
      </p>
    </div>
  ),{position});
};