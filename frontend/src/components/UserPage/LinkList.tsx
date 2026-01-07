import type { PublicUser } from "@mylinkspace/shared";
import ProfileLink from "./ProfileLink";
import { LINK_ICON_MAP, type LinkIconType } from "@/constants/link";
import { Globe } from "lucide-react";

type LinkListProps = {
  links: PublicUser["links"];
};

function LinkList({ links }: LinkListProps) {
  if (!links || links.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No links shared yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-2">
      {links.map((link) => {
        const Icon = LINK_ICON_MAP[link.icon as LinkIconType] || Globe;
        return (
          <ProfileLink
            key={`${link.url}-${link.position}`}
            title={link.title}
            url={link.url}
            icon={<Icon size={24} />}
          />
        );
      })}
    </div>
  );
}

export default LinkList;
