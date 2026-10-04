import { cn } from "cn"
import { Loader2Icon,Loader } from "lucide-react"

function Spinner({
  className,
  ...props
}) {
  return (
    <Loader
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props} />
  );
}

export { Spinner }
