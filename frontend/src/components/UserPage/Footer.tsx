import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

type FooterProps = {
  className?: string;
};

function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "static bottom-0 py-8 flex justify-center items-center gap-1",
        className
      )}
    >
      <Zap size={14} className="text-primary fill-primary/20" />
      <p className="text-sm font-medium text-muted-foreground">
        Powered by{" "}
        <Link
          to="/"
          className="text-text font-bold hover:text-primary transition-colors"
        >
          My Link Space
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
