"use client";

import Image from "next/image";

import { CTACluster } from "@/components/cta/cta-cluster";
import { PrimaryButton } from "@/components/cta/primary-button";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { SectionReveal } from "@/components/motion/section-reveal";
import { site } from "@/content/site";
import { ANALYTICS_EVENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-primary/10 ajax-hero-glow">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-accent/22 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:gap-14 md:py-28 lg:px-8">
        <SectionReveal>
          <div className="inline-flex items-center rounded-r-full border border-primary/10 border-l-4 border-l-accent bg-white/90 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm shadow-primary/5 backdrop-blur-sm">
            AJAX Volunteer Hub
          </div>
          <h1 className="font-display mt-6 text-balance-safe text-4xl font-extrabold tracking-[-0.035em] text-foreground md:text-5xl lg:text-[3.15rem] lg:leading-[1.08]">
            {site.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {site.hero.subhead}
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-primary/90">
            <span
              className="inline-block size-2 rounded-full bg-accent shadow-sm shadow-ajax-gold"
              aria-hidden
            />
            {site.hero.trustLine}
          </p>
          <CTACluster className="mt-10">
            <PrimaryButton
              href="/volunteer"
              analyticsEvent={() => trackEvent(ANALYTICS_EVENT.joinVolunteerCta)}
            >
              {site.hero.primaryCta}
            </PrimaryButton>
            <SecondaryButton
              href="/rules"
              analyticsEvent={() => trackEvent(ANALYTICS_EVENT.learnPetitionCta)}
            >
              {site.hero.secondaryCta}
            </SecondaryButton>
          </CTACluster>
        </SectionReveal>
        <SectionReveal className="relative flex justify-center md:justify-end">
          <div className="relative w-full max-w-md">
            <div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/30 via-primary/10 to-transparent blur-2xl"
              aria-hidden
            />
            <div className="relative rounded-[1.75rem] border border-white/80 bg-white/95 p-6 shadow-ajax-lg ring-1 ring-primary/10 backdrop-blur-sm md:p-7">
              <Image
                src={site.brand.logoSrc}
                alt={site.brand.logoAlt}
                width={site.brand.logoWidth}
                height={site.brand.logoHeight}
                className="h-auto w-full rounded-2xl object-contain drop-shadow-md"
                priority
              />
              <div className="mt-5 rounded-2xl bg-gradient-to-br from-primary to-ajax-navy-deep px-4 py-3.5 text-center text-primary-foreground shadow-ajax">
                <p className="text-sm font-bold tracking-wide">{site.announcement.goal}</p>
                <p className="mt-1 text-xs font-medium text-primary-foreground/85">
                  Grassroots energy · organized execution
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
