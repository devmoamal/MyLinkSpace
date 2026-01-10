import React from "react";
import { Link } from "@tanstack/react-router";
import Button from "@/components/common/Button";

type HeroSectionProps = {
  className?: string;
};

/**
 * Hero section for the homepage.
 * Contains main headline, subheadline, and CTA.
 */
function HeroSection({ className }: HeroSectionProps) {
  return (
    <div className={`space-y-6 ${className || ""}`}>
      <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
        Everything you are.
        <br />
        <span className="bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
          In one link.
        </span>
      </h1>

      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        The only link you'll ever need. Connect your audience to all of your
        content with just one simple URL.
      </p>
    </div>
  );
}

/**
 * CTA (Call-to-Action) section with username input and claim button.
 */
function CTASection({ className }: { className?: string }) {
  const [username, setUsername] = React.useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow letters, numbers, and underscores
    if (value === "" || /^[a-zA-Z0-9_]+$/.test(value)) {
      setUsername(value);
    }
  };

  return (
    <div className={`space-y-4 ${className || ""}`}>
      <div className="max-w-2xl mx-auto">
        <div className="relative flex items-center bg-secondary rounded-full ring-primary ring-2 p-2 pr-3">
          {/* Prefix - Dynamic Domain */}
          <span className="pl-6 pr-2 text-muted-foreground text-lg whitespace-nowrap">
            {window.location.host}/@
          </span>

          {/* Input */}
          <input
            type="text"
            placeholder="yourname"
            value={username}
            onChange={handleUsernameChange}
            className="flex-1 bg-transparent outline-none text-text text-lg placeholder:text-muted-foreground min-w-0"
          />

          {/* Button */}
          <Link to="/register">
            <Button size="lg" className="rounded-full px-8 ml-2">
              Claim Link
            </Button>
          </Link>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Free to get started. No credit card needed.
      </p>
    </div>
  );
}

export { HeroSection, CTASection };
