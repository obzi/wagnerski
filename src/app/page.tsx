import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { InfoStrip } from "@/components/ui/InfoStrip";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { TeamSection } from "@/components/sections/TeamSection";

export default function Home() {
  return (
    <>
      <ParallaxHero />
      <InfoStrip />
      <ServicesSection />
      <QuoteSection />
      <LocationsSection />
      <TeamSection />
    </>
  );
}
