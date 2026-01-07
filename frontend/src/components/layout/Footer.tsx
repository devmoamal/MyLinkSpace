import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

type FooterProps = {
  className?: string;
};

/**
 * Global footer component.
 * Displays branding and links.
 */
function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "w-full py-8 flex flex-col items-center gap-4 text-center",
        className
      )}
    >
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">
          Privacy
        </Link>
        <Link to="/" className="hover:text-primary transition-colors">
          Terms
        </Link>
      </div>

      <p className="text-xs text-muted-foreground">
        © 2024 MyLinkSpace. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
