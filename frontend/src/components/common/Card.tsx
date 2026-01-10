import { cn } from "@/lib/utils";
import React from "react";

type CardProps = {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "glass-alt";
};

/**
 * A versatile card component with premium aesthetics.
 * Supports different visual variants.
 */
function Card({ className, children, variant = "default" }: CardProps) {
  const variants = {
    default:
      "bg-transparent border-2 border-secondary shadow-sm shadow-purple-glow/10",
    glass:
      "bg-background/80 backdrop-blur-lg border-2 border-primary/10 shadow-purple-glow/5",
    "glass-alt":
      "bg-secondary/50 backdrop-blur-md border border-muted shadow-lg",
  };

  return (
    <div className={cn("rounded-4xl p-6", variants[variant], className)}>
      {children}
    </div>
  );
}

export default Card;
