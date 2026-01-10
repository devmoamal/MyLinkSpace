import Card from "@/components/common/Card";

type FeatureCardProps = {
  title: string;
  description: string;
  className?: string;
};

/**
 * Feature card component for displaying product features.
 * Used on landing pages and marketing content.
 */
function FeatureCard({ title, description, className }: FeatureCardProps) {
  return (
    <Card
      className={`p-6 bg-secondary/50 border-primary/10 hover:border-primary/30 transition-all ${
        className || ""
      }`}
    >
      <h3 className="text-lg font-bold text-text mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}

export default FeatureCard;
