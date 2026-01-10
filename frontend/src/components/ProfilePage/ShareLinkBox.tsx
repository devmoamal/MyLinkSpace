import { useState } from "react";
import Card from "@/components/common/Card";
import { Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

type ShareLinkBoxProps = {
  username: string;
  className?: string;
};

/**
 * Share link box component for profile page.
 * Compact, elegant design with icon-only actions.
 */
function ShareLinkBox({ username, className }: ShareLinkBoxProps) {
  const [copied, setCopied] = useState(false);

  // Construct the profile URL with @ prefix
  const profileUrl = `${window.location.host}/@${username}`;
  const fullUrl = `${window.location.origin}/@${username}`;

  const handleCopy = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = fullUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");
        textArea.remove();

        if (!successful) {
          throw new Error("Copy command failed");
        }
      }

      setCopied(true);
      toast.success("Link copied!");

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy link. Please copy manually.");
    }
  };

  const handleVisit = () => {
    window.open(fullUrl, "_blank");
  };

  return (
    <Card className={`p-4 ${className || ""}`}>
      <div className="space-y-3">
        {/* Header */}
        <h3 className="font-semibold">Your Profile Link</h3>

        {/* URL Display with Icon Actions */}
        <div className="flex items-center px-4 gap-2 p-3 rounded-3xl  bg-secondary ring-2 ring-accent">
          {/* URL Text - Selectable */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-mono text-primary truncate select-all cursor-text">
              {profileUrl}
            </p>
          </div>

          {/* Icon Actions */}
          <div className="flex gap-1 shrink-0">
            {/* Copy Icon Button */}
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-background rounded-lg transition-colors"
              title="Copy link"
              type="button"
            >
              {copied ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <Copy
                  size={18}
                  className="text-muted-foreground hover:text-text"
                />
              )}
            </button>

            {/* Visit Icon Button */}
            <button
              onClick={handleVisit}
              className="p-2 hover:bg-background rounded-lg transition-colors"
              title="Visit profile"
              type="button"
            >
              <ExternalLink
                size={18}
                className="text-muted-foreground hover:text-text"
              />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ShareLinkBox;
