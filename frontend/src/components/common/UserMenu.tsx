import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import Avatar from "./Avatar";

type UserMenuProps = {
  className?: string;
};

/**
 * User menu dropdown.
 * Shows username, profile link, and logout button.
 */
function UserMenu({ className }: UserMenuProps) {
  const { user, clearAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    clearAuth();
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={menuRef}>
      {/* Avatar Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <Avatar
          src={user.avatar_image_url || ""}
          alt={user.name}
          fallback={user.name}
          size="sm"
          className="cursor-pointer hover:ring-2 hover:ring-primary transition-all"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-card border border-muted shadow-lg overflow-hidden z-50">
          {/* Username */}
          <div className="px-4 py-3 border-b border-muted">
            <p className="text-sm font-medium text-text">{user.name}</p>
            <p className="text-xs text-muted-foreground">@{user.username}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-text hover:bg-secondary transition-colors"
            >
              <User size={16} />
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
