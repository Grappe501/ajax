import { FinalCTABand } from "@/components/cta/final-cta-band";
import { EventsPreviewSection } from "@/components/marketing/events-preview-section";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomeQuickLinks } from "@/components/marketing/home-quick-links";
import { StartHereCards } from "@/components/marketing/start-here-cards";
import { AskAjaxWidget } from "@/components/sections/ask-ajax-widget";

export function MarketingHome() {
  return (
    <main id="top">
      <HomeHero />
      <StartHereCards />
      <EventsPreviewSection />
      <HomeQuickLinks />
      <AskAjaxWidget />
      <FinalCTABand />
    </main>
  );
}
