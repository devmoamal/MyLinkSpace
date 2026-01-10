import { cn } from "@/lib/utils";

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  className?: string;
  showCounter?: boolean;
  disabled?: boolean;
};

/**
 * Reusable Textarea component with optional character counter.
 */
function Textarea({
  value,
  onChange,
  placeholder,
  maxLength,
  rows = 4,
  className,
  showCounter = false,
  disabled = false,
}: TextareaProps) {
  return (
    <div className="space-y-1.5">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        disabled={disabled}
        className={cn(
          "w-full px-5 py-3 rounded-2xl bg-secondary ring-accent ring-1",
          "focus:border-primary focus:bg-background transition-all outline-none",
          "text-text placeholder:text-muted-foreground shadow-sm resize-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
      />
      {showCounter && maxLength && (
        <p className="text-xs text-muted-foreground text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}

export default Textarea;
