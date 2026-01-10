import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

type ErrorAlertProps = {
  message: string;
  className?: string;
};

/**
 * Reusable error alert component.
 */
function ErrorAlert({ message, className }: ErrorAlertProps) {
  return (
    <div
      className={cn(
        "p-3 rounded-lg bg-destructive/10 border border-destructive/20",
        "flex items-center gap-2",
        className
      )}
    >
      <AlertCircle size={16} className="text-destructive shrink-0" />
      <p className="text-sm text-destructive">{message}</p>
    </div>
  );
}

export default ErrorAlert;
