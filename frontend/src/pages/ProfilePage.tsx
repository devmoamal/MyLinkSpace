import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { linkApi } from "@/lib/link";
import { userApi } from "@/lib/user";
import type { Link, User } from "@mylinkspace/shared";
import PageContainer from "@/components/common/PageContainer";
import AddLinkForm from "@/components/ProfilePage/AddLinkForm";
import EditProfileForm from "@/components/ProfilePage/EditProfileForm";
import ProfileHeader from "@/components/ProfilePage/ProfileHeader";
import LinksHeader from "@/components/ProfilePage/LinksHeader";
import LinksList from "@/components/ProfilePage/LinksList";
import ShareLinkBox from "@/components/ProfilePage/ShareLinkBox";
import { toast } from "sonner";
import { arrayMove } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";

type ProfilePageProps = {
  className?: string;
};

/**
 * Profile page for managing user profile and links.
 */
function ProfilePage({ className }: ProfilePageProps) {
  const { user: authUser, token, setAuth } = useAuth();
  const [user, setUser] = useState<User | null>(authUser);
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Fetch current user and links on mount
  useEffect(() => {
    if (token) {
      loadUserAndLinks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const loadUserAndLinks = async () => {
    if (!token) return;
    try {
      setIsLoading(true);

      // Fetch current user from /users/me
      const userResponse = await userApi.getCurrentUser(token);
      const currentUser = userResponse.data.user;
      setUser(currentUser);

      // Update auth store with latest user data
      setAuth(currentUser, token);

      // Fetch links
      const linksResponse = await linkApi.getMyLinks(token);
      setLinks(
        linksResponse.data.links.sort(
          (a, b) => (a.position ?? 0) - (b.position ?? 0)
        )
      );
    } catch (error) {
      console.error("Failed to load data:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load profile data";
      toast.error(errorMessage);

      // If it's an auth error, keep the user from auth store
      if (authUser) {
        setUser(authUser);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token || !confirm("Delete this link?")) return;
    try {
      await linkApi.deleteLink(id, token);
      setLinks(links.filter((l) => l.id !== id));
      toast.success("Link deleted");
    } catch (error) {
      console.error("Failed to delete link:", error);
      toast.error("Failed to delete link");
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
      toast.success(link.is_active ? "Link hidden" : "Link shown");
    } catch (error) {
      console.error("Failed to toggle link:", error);
      toast.error("Failed to toggle link");
    }
  };

  const handleToggleLive = async () => {
    if (!token || !user) return;
    try {
      const response = await userApi.updateCurrentUser(
        { is_live: !user.is_live },
        token
      );

      setUser(response.data.user);
      setAuth(response.data.user, token);
      toast.success(
        user.is_live ? "Profile is now private" : "Profile is now public"
      );
    } catch (error) {
      console.error("Failed to toggle profile status:", error);
      toast.error("Failed to update profile status");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || !token) return;

    const oldIndex = links.findIndex((link) => link.id === active.id);
    const newIndex = links.findIndex((link) => link.id === over.id);

    const newLinks = arrayMove(links, oldIndex, newIndex);
    setLinks(newLinks);

    try {
      await Promise.all(
        newLinks.map((link, index) =>
          linkApi.updateLink(
            link.id,
            { position: index, is_active: link.is_active },
            token
          )
        )
      );
      toast.success("Links reordered");
    } catch (error) {
      console.error("Failed to update positions:", error);
      toast.error("Failed to reorder links");
      loadUserAndLinks();
    }
  };

  const getNextPosition = () => {
    if (links.length === 0) return 0;
    return Math.max(...links.map((l) => l.position ?? 0)) + 1;
  };

  if (isLoading) {
    return (
      <PageContainer centered>
        <p className="text-muted-foreground">Loading...</p>
      </PageContainer>
    );
  }

  if (!user) {
    return (
      <PageContainer centered>
        <p className="text-muted-foreground">Please login to view this page</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer className={cn("py-8", className)}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Section */}
        <ProfileHeader
          user={user}
          onEditProfile={() => setShowEditProfile(true)}
          onToggleLive={handleToggleLive}
        />

        {/* Edit Profile Form */}
        {showEditProfile && (
          <EditProfileForm
            user={user}
            token={token!}
            onSuccess={(updatedUser) => {
              setUser(updatedUser);
              setAuth(updatedUser, token!);
              setShowEditProfile(false);
            }}
            onCancel={() => setShowEditProfile(false)}
          />
        )}

        {/* Share Link Box */}
        <ShareLinkBox username={user.username} />

        {/* Links Header */}
        <LinksHeader onAddLink={() => setShowAddForm(true)} />

        {/* Add Link Form */}
        {showAddForm && (
          <AddLinkForm
            token={token!}
            nextPosition={getNextPosition()}
            onSuccess={(newLink) => {
              setLinks([...links, newLink]);
              setShowAddForm(false);
              toast.success("Link added");
            }}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Links List */}
        <LinksList
          links={links}
          editingId={editingId}
          token={token!}
          onEdit={setEditingId}
          onCancelEdit={() => setEditingId(null)}
          onUpdate={(updated) => {
            setLinks(links.map((l) => (l.id === updated.id ? updated : l)));
            setEditingId(null);
            toast.success("Link updated");
          }}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
          onDragEnd={handleDragEnd}
        />
      </div>
    </PageContainer>
  );
}

export default ProfilePage;
