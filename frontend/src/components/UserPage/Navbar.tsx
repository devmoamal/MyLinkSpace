import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import DarkModeToggle from "../DarkModeToggle";
import Card from "../common/Card";

type NavbarProps = {
  className?: string;
};

/**
 * Top navigation bar for the application.
 */
function Navbar({ className }: NavbarProps) {
  return (
    <nav className="static top-0 z-50 w-full p-4 ">
      <Card
        className={cn(
          "flex justify-between items-center max-w-xl mx-auto px-6 py-3 border-none",
          className
        )}
      >
        <Link
          className="text-primary font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
          to="/"
        >
          MyLinkSpace
        </Link>
        <DarkModeToggle />
      </Card>
    </nav>
  );
}

export default Navbar;
