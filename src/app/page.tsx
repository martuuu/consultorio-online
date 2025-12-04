import { LandingHeader } from "@/components/sections/LandingHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { CTASection } from "@/components/sections/CTASection";
import { LandingFooter } from "@/components/sections/LandingFooter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted">
      <LandingHeader />

      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <ServicesSection />
        <PricingSection />
        <CTASection />
      </main>

      <LandingFooter />
    </div>
  );
}
