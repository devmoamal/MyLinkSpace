import { cn } from "@/lib/utils";

type AvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  const sizes = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-muted",
        sizes[size],
        className
      )}
    >
      {src ? (
        <img
          className="aspect-square h-full w-full object-cover"
          src={src}
          alt={alt || "Avatar"}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold">
          {fallback?.slice(0, 2).toUpperCase() || "??"}
        </div>
      )}
    </div>
  );
}

export default Avatar;
