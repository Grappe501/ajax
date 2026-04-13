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
        className="pointer-events-none absolute -right-24 top-0 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-gradient-to-t from-[#e8edf5]/90 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:gap-16 md:py-28 lg:px-8">
        <SectionReveal>
          <div className="inline-flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-r-full border border-primary/15 border-l-4 border-l-accent bg-white/95 px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-primary shadow-sm shadow-primary/5 backdrop-blur-sm">
              Welcome in
            </span>
            <span className="rounded-full border border-primary/10 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground backdrop-blur-sm">
              Jacksonville, AR
            </span>
          </div>
          <h1 className="font-publicDisplay mt-7 text-balance-safe text-4xl font-extrabold tracking-[-0.04em] text-foreground md:text-5xl lg:text-[3.35rem] lg:leading-[1.06]">
            {site.hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
            {site.hero.subhead}
          </p>
          <p className="mt-5 flex items-start gap-2.5 text-sm font-medium leading-snug text-primary/95">
            <span
              className="mt-1.5 inline-block size-2 shrink-0 rounded-full bg-accent shadow-sm shadow-ajax-gold"
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
              href="/initiative"
              analyticsEvent={() => trackEvent(ANALYTICS_EVENT.learnPetitionCta)}
            >
              {site.hero.secondaryCta}
            </SecondaryButton>
          </CTACluster>
          <p className="mt-6 text-sm text-muted-foreground">
            Need petition mechanics & witnessing?{" "}
            <a href="/rules" className="font-semibold text-primary underline-offset-4 hover:underline">
              Rules hub
            </a>{" "}
            · Deep-dive:{" "}
            <a href="/campaign" className="font-semibold text-primary underline-offset-4 hover:underline">
              Full campaign
            </a>
          </p>
        </SectionReveal>
        <SectionReveal className="relative flex justify-center md:justify-end">
          <div className="relative w-full max-w-md">
            <div
              className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-accent/40 via-primary/15 to-transparent opacity-90 blur-2xl motion-reduce:opacity-60"
              aria-hidden
            />
            <div className="relative rounded-[2rem] border border-white/90 bg-gradient-to-b from-white to-[#f4f7fb] p-7 shadow-ajax-lg ring-1 ring-primary/[0.07] backdrop-blur-md md:p-8">
              <div className="absolute inset-x-8 top-6 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden />
              <Image
                src={site.brand.logoSrc}
                alt={site.brand.logoAlt}
                width={site.brand.logoWidth}
                height={site.brand.logoHeight}
                className="h-auto w-full rounded-2xl object-contain drop-shadow-md"
                priority
              />
              <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#002d62] via-[#00224d] to-[#001a35] px-5 py-4 text-center text-primary-foreground shadow-ajax">
                <p className="text-sm font-bold tracking-wide">{site.announcement.goal}</p>
                <p className="mt-1.5 text-xs font-medium leading-relaxed text-primary-foreground/88">
                  Every signature is a neighbor choosing clarity over noise.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
