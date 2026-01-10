import Button from "@/components/common/Button";
import { Plus } from "lucide-react";

type LinksHeaderProps = {
  onAddLink: () => void;
};

/**
 * Header for the links section with add button.
 */
function LinksHeader({ onAddLink }: LinksHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">My Links</h1>
        <p className="text-muted-foreground">Manage your profile links</p>
      </div>
      <Button onClick={onAddLink} className="flex items-center gap-2">
        <Plus size={18} />
        Add Link
      </Button>
    </div>
  );
}

export default LinksHeader;
