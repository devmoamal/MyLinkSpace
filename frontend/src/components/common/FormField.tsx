import { cn } from "@/lib/utils";

type FormFieldProps = {
  label?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Reusable form field wrapper with label and error display.
 */
function FormField({ label, error, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label className="text-sm font-medium text-text">{label}</label>
      )}
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default FormField;
