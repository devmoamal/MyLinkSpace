import { cn } from "@/lib/utils";
import Avatar from "../common/Avatar";
import type { PublicUser } from "@mylinkspace/shared";
import VerifiedBadge from "../VerifiedBadge";
import LinkList from "./LinkList";
import { User as UserIcon } from "lucide-react";

type BodyProps = {
  user: PublicUser;
  className?: string;
};

/**
 * Main body of the user page.
 * Displays user profile info and their list of links.
 */
function Body({ user, className }: BodyProps) {
  return (
    <div
      className={cn(
        "max-w-xl mx-auto px-4 py-8 flex flex-col gap-10",
        className
      )}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center gap-6">
        <div className="relative">
          {user.avatar_image_url ? (
            <Avatar
              size="xl"
              src={user.avatar_image_url}
              alt={user.name}
              fallback={user.name}
              className="shadow-purple-glow"
            />
          ) : (
            <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center shadow-purple-glow">
              <UserIcon size={64} className="text-primary" />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-text">
              {user.name}
            </h1>
            {user.is_verified && (
              <VerifiedBadge size={16} className="shrink-0" />
            )}
          </div>

          <p className="text-primary font-medium">@{user.username}</p>
          <p className="text-text">{user.bio}</p>
        </div>

        {/* Links Count or Bio placeholder */}
        <div className="flex gap-4">
          <div className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-muted">
            {user.links.length} Links
          </div>
        </div>
      </div>

      {/* Links Section */}
      <LinkList links={user.links} />
    </div>
  );
}

export default Body;
