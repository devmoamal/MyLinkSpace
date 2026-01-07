import useTheme from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

type DarkModeToggleProps = {
  className?: string;
};

function DarkModeToggle({ className }: DarkModeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={cn("bg-primary rounded-full p-2 cursor-pointer", className)}
      onClick={toggleTheme}
    >
      <div>
        {theme === "dark" ? (
          <Moon className="text-white" />
        ) : (
          <Sun className="text-white" />
        )}
      </div>
    </div>
  );
}

export default DarkModeToggle;
