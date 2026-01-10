import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import DarkModeToggle from "../DarkModeToggle";
import Card from "../common/Card";
import { LogIn } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import UserMenu from "../common/UserMenu";

type NavbarProps = {
  className?: string;
  showAuth?: boolean;
};

/**
 * Global navigation bar for the application.
 * Shows dark mode toggle and auth buttons/avatar.
 */
function Navbar({ className, showAuth = true }: NavbarProps) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Hide auth on user profile pages
  const isProfilePage =
    location.pathname.startsWith("/") &&
    location.pathname !== "/" &&
    !location.pathname.startsWith("/login") &&
    !location.pathname.startsWith("/register") &&
    !location.pathname.startsWith("/profile");

  return (
    <nav className="static top-0 w-full p-4 ">
      <Card
        className={cn(
          "flex justify-between items-center max-w-6xl mx-auto px-6 py-3 ",
          className
        )}
      >
        {/* Logo */}
        <Link
          className="text-primary font-bold text-lg tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2"
          to="/"
        >
          <span className="text-2xl">🔗</span>
          MyLinkSpace
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <DarkModeToggle />

          {showAuth && !isProfilePage && (
            <>
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Link to="/login">
                  <div className="h-10 w-10 rounded-full bg-primary hover:opacity-90 transition-all flex items-center justify-center cursor-pointer active:scale-95">
                    <LogIn size={18} className="text-primary-foreground" />
                  </div>
                </Link>
              )}
            </>
          )}
        </div>
      </Card>
    </nav>
  );
}

export default Navbar;
