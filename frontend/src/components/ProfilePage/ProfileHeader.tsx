import { cn } from "@/lib/utils";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import { User as UserIcon, Edit, Globe, Lock } from "lucide-react";
import type { User } from "@mylinkspace/shared";

type ProfileHeaderProps = {
  user: User;
  onEditProfile: () => void;
  onToggleLive: () => void;
};

/**
 * Profile header component showing user info and status toggle.
 */
function ProfileHeader({
  user,
  onEditProfile,
  onToggleLive,
}: ProfileHeaderProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <UserIcon size={32} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">@{user.username}</p>
            {user.bio && <p className="text-sm text-text mt-2">{user.bio}</p>}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onEditProfile}
          className="flex items-center gap-2"
        >
          <Edit size={16} />
          Edit
        </Button>
      </div>

      <hr className="border-accent" />

      {/* Profile Status Toggle */}
      <div className="mt-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center",
                user.is_live ? "bg-green-500/10" : "bg-muted"
              )}
            >
              {user.is_live ? (
                <Globe size={20} className="text-green-500" />
              ) : (
                <Lock size={20} className="text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-medium text-sm">Profile Status</p>
              <p className="text-xs text-muted-foreground">
                {user.is_live
                  ? "Your profile is public"
                  : "Your profile is private"}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleLive}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              user.is_live ? "bg-green-500" : "bg-muted"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                user.is_live ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ProfileHeader;
