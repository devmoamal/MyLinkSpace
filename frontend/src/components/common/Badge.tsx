import { cn } from "@/lib/utils";

type BadgeProps = {
  className?: string;
};

function Badge({ className }: BadgeProps) {
  return <div className={cn("", className)}>Badge</div>;
}

export default Badge;
