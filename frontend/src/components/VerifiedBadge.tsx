import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type VerifiedBadgeProps = {
  size?: number;
  className?: string;
};

function VerifiedBadge({ size = 12, className }: VerifiedBadgeProps) {
  return (
    <div className={cn("bg-primary rounded-full p-1", className)}>
      <Check className="text-text-foreground" size={size} />
    </div>
  );
}

export default VerifiedBadge;
