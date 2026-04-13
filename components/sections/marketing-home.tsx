import { AssistantSpotlight } from "@/components/marketing/assistant-spotlight";
import { FinalCTABand } from "@/components/cta/final-cta-band";
import { EventsPreviewSection } from "@/components/marketing/events-preview-section";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomeQuickLinks } from "@/components/marketing/home-quick-links";
import { StartHereCards } from "@/components/marketing/start-here-cards";
import { WelcomeJourney } from "@/components/marketing/welcome-journey";

export function MarketingHome() {
  return (
    <main id="top">
      <HomeHero />
      <WelcomeJourney />
      <StartHereCards />
      <EventsPreviewSection />
      <HomeQuickLinks />
      <AssistantSpotlight />
      <FinalCTABand />
    </main>
  );
}
