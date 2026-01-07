import { cn } from "@/lib/utils";
import React from "react";

type ProfileLinkProps = {
  title: string;
  url: string;
  icon?: React.ReactNode;
  className?: string;
};

/**
 * A premium link component for the profile page.
 * Features a hover effect and clean layout.
 */
function ProfileLink({ title, url, icon, className }: ProfileLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex items-center justify-between p-4 rounded-full ring-2 ring-primary/30 bg-secondary hover:bg-primary/10 ",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="text-primary ">{icon}</div>
        <span className="font-semibold text-text group-hover:text-primary">
          {title}
        </span>
      </div>
    </a>
  );
}

export default ProfileLink;
