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
      className="relative overflow-hidden border-b border-accent/20 bg-gradient-to-br from-primary via-[#002850] to-ajax-navy-deep py-20 text-primary-foreground md:py-24"
    >
      <div
        className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(253,185,19,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="final-cta-heading"
          className="font-display text-3xl font-extrabold tracking-[-0.03em] text-white md:text-4xl lg:text-[2.5rem] lg:leading-tight"
        >
          {finalCta.title}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
          {finalCta.subtitle}
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <SecondaryButton
            href={finalCta.ctas[0].href}
            className="border-white/35 bg-white/10 text-white shadow-lg shadow-black/10 backdrop-blur-sm hover:bg-white/20"
            analyticsEvent={() => trackEvent(ANALYTICS_EVENT.getUpdatesCta)}
          >
            {finalCta.ctas[0].label}
          </SecondaryButton>
          <PrimaryButton
            href={finalCta.ctas[1].href}
            className="border border-accent/40 bg-accent text-accent-foreground shadow-ajax-gold hover:bg-ajax-gold-soft"
            analyticsEvent={() => trackEvent(ANALYTICS_EVENT.joinVolunteerCta)}
          >
            {finalCta.ctas[1].label}
          </PrimaryButton>
          <SecondaryButton
            href={finalCta.ctas[2].href}
            className="border-white/35 bg-white/10 text-white shadow-lg shadow-black/10 backdrop-blur-sm hover:bg-white/20"
            analyticsEvent={() => trackEvent(ANALYTICS_EVENT.leadershipCta)}
          >
            {finalCta.ctas[2].label}
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}
