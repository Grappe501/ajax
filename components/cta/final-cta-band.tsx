"use client";

import { site } from "@/content/site";

import { PrimaryButton } from "@/components/cta/primary-button";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { ANALYTICS_EVENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function FinalCTABand() {
  const { finalCta } = site;
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="border-b border-border bg-gradient-to-br from-primary via-primary to-primary/90 py-16 text-primary-foreground md:py-20"
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="final-cta-heading"
          className="font-display text-3xl font-bold tracking-tight md:text-4xl"
        >
          {finalCta.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-primary-foreground/90">
          {finalCta.subtitle}
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center">
          <SecondaryButton
            href={finalCta.ctas[0].href}
            className="border-white/30 bg-white/10 text-white hover:bg-white/15"
            analyticsEvent={() => trackEvent(ANALYTICS_EVENT.getUpdatesCta)}
          >
            {finalCta.ctas[0].label}
          </SecondaryButton>
          <PrimaryButton
            href={finalCta.ctas[1].href}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            analyticsEvent={() => trackEvent(ANALYTICS_EVENT.joinVolunteerCta)}
          >
            {finalCta.ctas[1].label}
          </PrimaryButton>
          <SecondaryButton
            href={finalCta.ctas[2].href}
            className="border-white/30 bg-white/10 text-white hover:bg-white/15"
            analyticsEvent={() => trackEvent(ANALYTICS_EVENT.leadershipCta)}
          >
            {finalCta.ctas[2].label}
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}
