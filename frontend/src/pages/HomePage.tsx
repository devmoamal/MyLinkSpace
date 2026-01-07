import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import Button from "@/components/common/Button";

type HomePageProps = {
  className?: string;
};

/**
 * Landing page for MyLinkSpace.
 * Simple, centered hero with CTA.
 */
function HomePage({ className }: HomePageProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background flex items-center justify-center px-4",
        className
      )}
    >
      <div className="max-w-3xl mx-auto text-center space-y-12 py-20">
        {/* Hero Text */}
        <div className="space-y-6">
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

        {/* CTA Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary border-2 border-muted">
              <span className="text-muted-foreground text-sm whitespace-nowrap">
                mylinkspace.io/
              </span>
              <input
                type="text"
                placeholder="yourname"
                className="flex-1 bg-transparent outline-none text-text placeholder:text-muted-foreground"
              />
            </div>
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto px-8">
                Claim Link
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Free to get started. No credit card needed.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <FeatureCard
            title="Simple"
            description="One link for everything you create, share and sell online."
          />
          <FeatureCard
            title="Fast"
            description="Set up your page in minutes. No coding required."
          />
          <FeatureCard
            title="Powerful"
            description="Track clicks and grow your audience with analytics."
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Feature card component for homepage.
 */
function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-all">
      <h3 className="text-lg font-bold text-text mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default HomePage;
