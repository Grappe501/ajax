import { AssistantSpotlight } from "@/components/marketing/assistant-spotlight";
import { CityBeliefApproach } from "@/components/marketing/city-belief-approach";
import { FinalCTABand } from "@/components/cta/final-cta-band";
import { EventsPreviewSection } from "@/components/marketing/events-preview-section";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomeQuickLinks } from "@/components/marketing/home-quick-links";
import { StartHereCards } from "@/components/marketing/start-here-cards";
import { VoterLookupStrip } from "@/components/marketing/voter-lookup-strip";
import { WelcomeJourney } from "@/components/marketing/welcome-journey";

export function MarketingHome() {
  return (
    <main id="top">
      <HomeHero />
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-2 sm:px-6 lg:px-8">
        <VoterLookupStrip />
      </section>
      <CityBeliefApproach />
      <WelcomeJourney />
      <StartHereCards />
      <EventsPreviewSection />
      <HomeQuickLinks />
      <AssistantSpotlight />
      <FinalCTABand />
    </main>
  );
}
