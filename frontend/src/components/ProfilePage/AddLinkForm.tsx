import { useState } from "react";
import { linkApi } from "@/lib/link";
import type { Link } from "@mylinkspace/shared";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import { X } from "lucide-react";
import { LINK_ICON_MAP, type LinkIconType } from "@/constants/link";
import { LINK_TYPES } from "@mylinkspace/shared";

type AddLinkFormProps = {
  token: string;
  onSuccess: (link: Link) => void;
  onCancel: () => void;
};

/**
 * Form for adding a new link.
 */
function AddLinkForm({ token, onSuccess, onCancel }: AddLinkFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<(typeof LINK_TYPES)[number]>("Website");
  const [icon, setIcon] = useState<LinkIconType>("Website");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await linkApi.createLink(
        { title, url, icon, type },
        token
      );
      onSuccess(response.data.link);
    } catch (error) {
      console.error("Failed to create link:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get placeholder and input type based on link type
  const getUrlPlaceholder = () => {
    switch (type) {
      case "Email":
        return "email@example.com";
      case "Phone":
        return "+1234567890";
      default:
        return "https://example.com";
    }
  };

  const getUrlInputType = () => {
    switch (type) {
      case "Email":
        return "email";
      case "Phone":
        return "tel";
      default:
        return "url";
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Add New Link</h3>
          <button type="button" onClick={onCancel}>
            <X size={20} className="text-muted-foreground hover:text-text" />
          </button>
        </div>

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Type Selector */}
        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value as (typeof LINK_TYPES)[number])
          }
          className="w-full px-4 py-2 rounded-xl bg-secondary border-2 border-muted text-text outline-none focus:border-primary transition-colors"
        >
          {LINK_TYPES.map((linkType) => (
            <option key={linkType} value={linkType}>
              {linkType}
            </option>
          ))}
        </select>

        <Input
          placeholder={getUrlPlaceholder()}
          type={getUrlInputType()}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        {/* Icon Selector */}
        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value as LinkIconType)}
          className="w-full px-4 py-2 rounded-xl bg-secondary border-2 border-muted text-text outline-none focus:border-primary transition-colors"
        >
          {Object.keys(LINK_ICON_MAP).map((iconName) => (
            <option key={iconName} value={iconName}>
              {iconName}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <Button type="submit" className="flex-1" isLoading={isSubmitting}>
            Add Link
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default AddLinkForm;
