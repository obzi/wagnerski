import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { InfoStrip } from "@/components/ui/InfoStrip";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ParallaxQuote } from "@/components/ui/ParallaxQuote";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { Reveal } from "@/components/ui/Reveal";

export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <ParallaxHero />
      <InfoStrip />
      <Reveal>
        <ServicesSection />
      </Reveal>
      <ParallaxQuote />
      <Reveal>
        <LocationsSection />
      </Reveal>
      <Reveal>
        <TeamSection />
      </Reveal>
    </>
  );
}
