import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { linkApi } from "@/lib/link";
import type { Link } from "@mylinkspace/shared";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { Plus } from "lucide-react";
import AddLinkForm from "@/components/ProfilePage/AddLinkForm";
import LinkItem from "@/components/ProfilePage/LinkItem";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type ProfilePageProps = {
  className?: string;
};

/**
 * Profile page for managing user links.
 * Allows creating, editing, deleting, reordering, and toggling links.
 */
function ProfilePage({ className }: ProfilePageProps) {
  const { user, token } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch links on mount
  useEffect(() => {
    if (token) {
      loadLinks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const loadLinks = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const response = await linkApi.getMyLinks(token);
      setLinks(response.data.links.sort((a, b) => a.position - b.position));
    } catch (error) {
      console.error("Failed to load links:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token || !confirm("Delete this link?")) return;
    try {
      await linkApi.deleteLink(id, token);
      setLinks(links.filter((l) => l.id !== id));
    } catch (error) {
      console.error("Failed to delete link:", error);
    }
  };

  const handleToggleActive = async (link: Link) => {
    if (!token) return;
    try {
      const response = await linkApi.updateLink(
        link.id,
        { is_active: !link.is_active },
        token
      );
      setLinks(links.map((l) => (l.id === link.id ? response.data.link : l)));
    } catch (error) {
      console.error("Failed to toggle link:", error);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || !token) return;

    const oldIndex = links.findIndex((link) => link.id === active.id);
    const newIndex = links.findIndex((link) => link.id === over.id);

    const newLinks = arrayMove(links, oldIndex, newIndex);
    setLinks(newLinks);

    // Update positions on backend
    try {
      await Promise.all(
        newLinks.map((link, index) =>
          linkApi.updateLink(link.id, { position: index }, token)
        )
      );
    } catch (error) {
      console.error("Failed to update positions:", error);
      // Reload links on error
      loadLinks();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Please login to view this page</p>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-background py-8 px-4", className)}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Links</h1>
            <p className="text-muted-foreground">Manage your profile links</p>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Add Link
          </Button>
        </div>

        {/* Add Link Form */}
        {showAddForm && (
          <AddLinkForm
            token={token!}
            onSuccess={(newLink) => {
              setLinks([...links, newLink]);
              setShowAddForm(false);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Links List */}
        <div className="space-y-3">
          {isLoading ? (
            <Card className="p-8 text-center text-muted-foreground">
              Loading...
            </Card>
          ) : links.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              No links yet. Add your first link!
            </Card>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={links.map((l) => l.id)}
                strategy={verticalListSortingStrategy}
              >
                {links.map((link) => (
                  <LinkItem
                    key={link.id}
                    link={link}
                    isEditing={editingId === link.id}
                    onEdit={() => setEditingId(link.id)}
                    onCancelEdit={() => setEditingId(null)}
                    onUpdate={(updated) => {
                      setLinks(
                        links.map((l) => (l.id === updated.id ? updated : l))
                      );
                      setEditingId(null);
                    }}
                    onDelete={() => handleDelete(link.id)}
                    onToggleActive={() => handleToggleActive(link)}
                    token={token!}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
