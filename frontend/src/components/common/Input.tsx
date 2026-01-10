import { cn } from "@/lib/utils";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

/**
 * A premium input component with smooth transitions and clean aesthetics.
 */
function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-semibold text-text ml-1">{label}</label>
      )}
      <input
        className={cn(
          "ring-accent ring-1",
          "w-full px-5 py-3 rounded-2xl bg-secondary border-2 border-transparent focus:border-primary focus:bg-background transition-all outline-none text-text placeholder:text-muted-foreground shadow-sm",
          error && "border-destructive focus:border-destructive",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-destructive ml-1">{error}</span>}
    </div>
  );
}

export default Input;
