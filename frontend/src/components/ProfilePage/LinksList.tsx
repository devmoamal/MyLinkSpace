import Card from "@/components/common/Card";
import type { Link } from "@mylinkspace/shared";
import LinkItem from "./LinkItem";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type LinksListProps = {
  links: Link[];
  editingId: number | null;
  token: string;
  onEdit: (id: number) => void;
  onCancelEdit: () => void;
  onUpdate: (link: Link) => void;
  onDelete: (id: number) => void;
  onToggleActive: (link: Link) => void;
  onDragEnd: (event: DragEndEvent) => void;
};

/**
 * Draggable list of links with edit/delete/toggle functionality.
 */
function LinksList({
  links,
  editingId,
  token,
  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  onToggleActive,
  onDragEnd,
}: LinksListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (links.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        No links yet. Add your first link!
      </Card>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={links.map((l) => l.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {links.map((link) => (
            <LinkItem
              key={link.id}
              link={link}
              isEditing={editingId === link.id}
              onEdit={() => onEdit(link.id)}
              onCancelEdit={onCancelEdit}
              onUpdate={onUpdate}
              onDelete={() => onDelete(link.id)}
              onToggleActive={() => onToggleActive(link)}
              token={token}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default LinksList;
