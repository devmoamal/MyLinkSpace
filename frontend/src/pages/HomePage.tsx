import PageContainer from "@/components/common/PageContainer";
import FeatureCard from "@/components/common/FeatureCard";
import { HeroSection, CTASection } from "@/components/HomePage/HeroSection";

type HomePageProps = {
  className?: string;
};

/**
 * Landing page for MyLinkSpace.
 * Simple, centered hero with CTA and features.
 */
function HomePage({ className }: HomePageProps) {
  return (
    <PageContainer centered className={className}>
      <div className="max-w-3xl mx-auto text-center space-y-12 py-20">
        {/* Hero Text */}
        <HeroSection />

        {/* CTA Section */}
        <CTASection />

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
    </PageContainer>
  );
}

export default HomePage;
