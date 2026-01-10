import { useState } from "react";
import { userApi } from "@/lib/user";
import type { User } from "@mylinkspace/shared";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import { X, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

type EditProfileFormProps = {
  user: User;
  token: string;
  onSuccess: (user: User) => void;
  onCancel: () => void;
};

/**
 * Form for editing user profile.
 */
function EditProfileForm({
  user,
  token,
  onSuccess,
  onCancel,
}: EditProfileFormProps) {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await userApi.updateCurrentUser(
        { name, username, email, bio },
        token
      );
      onSuccess(response.data.user);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UserIcon size={20} className="text-primary" />
            <h3 className="font-semibold">Edit Profile</h3>
          </div>
          <button type="button" onClick={onCancel}>
            <X size={20} className="text-muted-foreground hover:text-text" />
          </button>
        </div>

        <Input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => {
            // Only allow letters, numbers, and underscores
            const value = e.target.value;
            if (value === "" || /^[a-zA-Z0-9_]+$/.test(value)) {
              setUsername(value);
            }
          }}
          required
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Textarea
          placeholder="Bio (optional)"
          value={bio}
          onChange={setBio}
          maxLength={1000}
          rows={4}
          showCounter
        />

        <div className="flex gap-2">
          <Button type="submit" className="flex-1" isLoading={isSubmitting}>
            Save Changes
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default EditProfileForm;
