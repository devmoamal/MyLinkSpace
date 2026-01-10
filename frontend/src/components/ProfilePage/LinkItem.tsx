import { useState } from "react";
import { linkApi } from "@/lib/link";
import type { Link } from "@mylinkspace/shared";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import IconSelector from "./IconSelector";
import LinkTypeSelector from "./LinkTypeSelector";
import { GripVertical, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { LINK_ICON_MAP, type LinkIconType } from "@/constants/link";
import { LINK_TYPES } from "@mylinkspace/shared";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

type LinkItemProps = {
  link: Link;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onUpdate: (link: Link) => void;
  onDelete: () => void;
  onToggleActive: () => void;
  token: string;
};

/**
 * Individual link item with edit/delete/toggle actions and drag-and-drop.
 */
function LinkItem({
  link,
  isEditing,
  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  onToggleActive,
  token,
}: LinkItemProps) {
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [type, setType] = useState<(typeof LINK_TYPES)[number]>(
    link.type as (typeof LINK_TYPES)[number]
  );
  const [icon, setIcon] = useState<LinkIconType>(link.icon as LinkIconType);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = LINK_ICON_MAP[link.icon as LinkIconType];

  const handleUpdate = async () => {
    try {
      setIsSubmitting(true);
      const response = await linkApi.updateLink(
        link.id,
        { title, url, type, icon },
        token
      );
      onUpdate(response.data.link);
    } catch (error) {
      console.error("Failed to update link:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing) {
    return (
      <Card className="p-4 space-y-3">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <LinkTypeSelector value={type} onChange={setType} />

        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />

        <IconSelector value={icon} onChange={setIcon} />

        <div className="flex gap-2">
          <Button
            onClick={handleUpdate}
            className="flex-1"
            size="sm"
            isLoading={isSubmitting}
          >
            Save
          </Button>
          <Button variant="outline" onClick={onCancelEdit} size="sm">
            Cancel
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className={cn(
          "p-4 flex items-center gap-4 hover:border-primary/30 transition-colors",
          isDragging && "opacity-50",
          !link.is_active && "opacity-60 bg-secondary/50"
        )}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={20} className="text-muted-foreground" />
        </div>

        {/* Icon */}
        <div className={cn("text-primary", !link.is_active && "opacity-50")}>
          <Icon size={24} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-text truncate">{link.title}</p>
            <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
              {link.type}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{link.url}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {/* Toggle Active */}
          <button
            onClick={onToggleActive}
            className={cn(
              "p-2 rounded-lg transition-colors",
              link.is_active
                ? "hover:bg-secondary text-primary"
                : "hover:bg-secondary text-muted-foreground"
            )}
            title={link.is_active ? "Hide link" : "Show link"}
          >
            {link.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>

          {/* Edit */}
          <button
            onClick={onEdit}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Pencil size={16} className="text-muted-foreground" />
          </button>

          {/* Delete */}
          <button
            onClick={onDelete}
            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <Trash2 size={16} className="text-destructive" />
          </button>
        </div>
      </Card>
    </div>
  );
}

export default LinkItem;
