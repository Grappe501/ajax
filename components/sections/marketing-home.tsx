"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  PenLine,
  Quote,
  Sparkles,
} from "lucide-react";

import { FinalCTABand } from "@/components/cta/final-cta-band";
import { CTACluster } from "@/components/cta/cta-cluster";
import { PrimaryButton } from "@/components/cta/primary-button";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { HostLocationForm } from "@/components/forms/host-location-form";
import { LeadershipInterestForm } from "@/components/forms/leadership-interest-form";
import { SigningAlertsForm } from "@/components/forms/signing-alerts-form";
import { VolunteerSignupForm } from "@/components/forms/volunteer-signup-form";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionReveal } from "@/components/motion/section-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { events } from "@/content/events";
import { site } from "@/content/site";
import { wards } from "@/content/wards";
import { ANALYTICS_EVENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

import { FaqSection } from "@/components/sections/faq-section";
import { RuleAccordion } from "@/components/sections/rule-accordion";
import { TrainingPreview } from "@/components/sections/training-preview";
import { AskAjaxWidget } from "@/components/sections/ask-ajax-widget";

const startIcons = {
  understand: BookOpen,
  sign: PenLine,
  volunteer: HeartHandshake,
  lead: MapPin,
} as const;

function MultilineAnswer({ text, className }: { text: string; className?: string }) {
  const parts = text.split("\n\n").filter(Boolean);
  return (
    <div className={className}>
      {parts.map((para, idx) => (
        <p key={idx} className="leading-relaxed last:mb-0 [&:not(:first-child)]:mt-3">
          {para}
        </p>
      ))}
    </div>
  );
}

export function MarketingHome() {
  return (
    <main id="top">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/[0.06] via-background to-secondary/40">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <SectionReveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              AJAX Volunteer Hub
            </p>
            <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              {site.hero.headline}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {site.hero.subhead}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{site.hero.trustLine}</p>
            <CTACluster className="mt-8">
              <PrimaryButton
                href="#volunteer-form"
                analyticsEvent={() =>
                  trackEvent(ANALYTICS_EVENT.joinVolunteerCta)
                }
              >
                {site.hero.primaryCta}
              </PrimaryButton>
              <SecondaryButton
                href="#rules"
                analyticsEvent={() =>
                  trackEvent(ANALYTICS_EVENT.learnPetitionCta)
                }
              >
                {site.hero.secondaryCta}
              </SecondaryButton>
            </CTACluster>
          </SectionReveal>
          <SectionReveal className="relative">
            <div className="relative mx-auto max-w-md rounded-3xl border border-border/80 bg-card p-5 shadow-lg ring-1 ring-primary/5">
              <Image
                src={site.brand.logoSrc}
                alt={site.brand.logoAlt}
                width={site.brand.logoWidth}
                height={site.brand.logoHeight}
                className="h-auto w-full rounded-2xl object-contain"
                priority
              />
              <div className="mt-4 rounded-2xl bg-primary px-4 py-3 text-center text-primary-foreground">
                <p className="text-sm font-semibold">{site.announcement.goal}</p>
                <p className="text-xs text-primary-foreground/85">
                  Grassroots energy · organized execution
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Start here */}
      <SectionShell id="start-here" muted>
        <SectionHeading
          title="Start here"
          subtitle="Pick the path that matches where you are today. Every link takes you to a focused section on this page."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {site.startHere.map((card) => {
            const Icon = startIcons[card.id as keyof typeof startIcons];
            return (
              <a
                key={card.id}
                href={card.anchor}
                className="group flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span>
                  <span className="font-display text-lg font-bold text-foreground group-hover:text-primary">
                    {card.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {card.description}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Go to section
                    <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </SectionShell>

      {/* What campaign */}
      <SectionShell id="what-this-campaign-is">
        <SectionHeading
          eyebrow="Plain language"
          title={site.whatCampaign.title}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-2xl border-border/80 p-6 shadow-sm">
            <h3 className="font-display text-xl font-bold text-primary">
              At-large voting
            </h3>
            <p className="mt-3 text-muted-foreground">{site.whatCampaign.atLarge}</p>
          </Card>
          <Card className="rounded-2xl border-primary/25 bg-primary/5 p-6 shadow-sm">
            <h3 className="font-display text-xl font-bold text-primary">
              Ward-only voting
            </h3>
            <p className="mt-3 text-muted-foreground">{site.whatCampaign.wardOnly}</p>
          </Card>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl border-border/80 p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold">What the petition does</h3>
            <p className="mt-3 text-muted-foreground">{site.whatCampaign.petition}</p>
          </Card>
          <Card className="rounded-2xl border-border/80 p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold">Why it matters locally</h3>
            <p className="mt-3 text-muted-foreground">{site.whatCampaign.local}</p>
          </Card>
        </div>
        <div className="mt-8">
          <p className="font-display text-lg font-bold text-foreground">
            Go deeper: Jacksonville’s system and what reform changes
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Short version above — open a topic below for the full case we make at doors and tables.
          </p>
          <Accordion multiple={false} className="mt-4 w-full space-y-3">
            {site.whatCampaign.deepDive.map((item, i) => (
              <AccordionItem
                key={item.title}
                value={`campaign-deep-${i}`}
                className="rounded-xl border border-border/80 bg-card px-4 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">
                  <MultilineAnswer text={item.body} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionShell>

      {/* Why Jacksonville */}
      <SectionShell id="why-it-matters" muted>
        <SectionHeading
          title={site.whyJacksonville.title}
          subtitle={site.whyJacksonville.subtitle}
        />
        <Accordion multiple={false} className="w-full space-y-3">
          {site.whyJacksonville.benefits.map((b, i) => (
            <AccordionItem
              key={b.title}
              value={`why-jax-${i}`}
              className="rounded-xl border border-border/80 bg-card px-4 data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="py-4 text-left hover:no-underline">
                <span className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <span>
                    <span className="font-display text-base font-bold text-foreground">{b.title}</span>
                    <span className="mt-1 block text-sm font-normal text-muted-foreground">
                      {b.summary}
                    </span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pl-8 text-muted-foreground sm:pl-11">
                <MultilineAnswer text={b.detail} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionShell>

      {/* How volunteers */}
      <SectionShell id="how-volunteers">
        <SectionHeading
          title={site.volunteerStory.title}
          subtitle={
            <>
              {site.volunteerStory.body.map((p) => (
                <p key={p.slice(0, 24)} className="mb-3 last:mb-0">
                  {p}
                </p>
              ))}
            </>
          }
        />
        <blockquote className="rounded-2xl border border-dashed border-primary/30 bg-secondary/40 px-6 py-5 text-lg font-medium leading-relaxed text-foreground">
          {site.volunteerStory.reassurance}
        </blockquote>
      </SectionShell>

      {/* Ladder */}
      <SectionShell id="ladder" muted>
        <SectionHeading title={site.ladder.title} subtitle={site.ladder.subtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {site.ladder.columns.map((col) => (
            <Card
              key={col.id}
              className="flex flex-col rounded-2xl border-border/80 p-6 shadow-sm"
            >
              <h3 className="font-display text-xl font-bold text-primary">{col.title}</h3>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <PrimaryButton href={col.href} className="mt-6 w-full justify-center">
                {col.cta}
              </PrimaryButton>
            </Card>
          ))}
        </div>
      </SectionShell>

      {/* Rules */}
      <SectionShell id="rules">
        <SectionHeading
          eyebrow="Confidence"
          title="Petition rules and procedures"
          subtitle="Short summaries first — open any topic for practical detail. When in doubt, ask a lead volunteer before you advise a signer."
        />
        <RuleAccordion />
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <SecondaryButton href="/rules">Open full rules hub (preview)</SecondaryButton>
          <a
            href="/ajax-petition-quick-guide.pdf"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            Printable quick guide (PDF — link TBD)
          </a>
        </div>
      </SectionShell>

      {/* Training */}
      <SectionShell id="training" muted>
        <SectionHeading
          title="Training center preview"
          subtitle="Structured modules help first-time volunteers feel prepared — and give experienced helpers a shared playbook."
        />
        <TrainingPreview />
        <p className="mt-6 text-sm text-muted-foreground">
          Phase 2 will expand this into a dedicated training center with schedules
          and materials.
        </p>
      </SectionShell>

      {/* Events */}
      <SectionShell id="events">
        <SectionHeading
          title="Upcoming events"
          subtitle="Real-world moments build trust. RSVP links will activate as venues confirm."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((ev) => (
            <Card
              key={ev.title}
              className="rounded-2xl border-border/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                {ev.type}
              </p>
              <h3 className="font-display mt-2 text-lg font-bold">{ev.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {ev.date} · {ev.time}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{ev.location}</p>
              <Link
                href={ev.ctaHref}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                onClick={() => trackEvent(ANALYTICS_EVENT.eventCta)}
              >
                {ev.ctaLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <PrimaryButton href="/events" className="justify-center">
            View full event calendar
          </PrimaryButton>
        </div>
      </SectionShell>

      {/* Wards */}
      <SectionShell id="wards" muted>
        <SectionHeading
          title="Jacksonville’s five wards"
          subtitle="Each ward grows a team anchored by a ward captain. Phase 1 introduces the map — Phase 2 deepens tools and dashboards."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wards.map((w) => (
            <Card
              key={w.slug}
              className="rounded-2xl border-border/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold">{w.name}</h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold capitalize text-muted-foreground">
                  {w.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{w.summary}</p>
              <p className="mt-3 text-xs text-muted-foreground">{w.captain}</p>
              <Link
                href={`/wards/${w.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
              >
                Ward preview
                <ArrowRight className="size-4" />
              </Link>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <SecondaryButton href="/wards">Explore ward overview</SecondaryButton>
        </div>
      </SectionShell>

      {/* Forms cluster */}
      <SectionShell id="volunteer-form">
        <SectionHeading
          title="Join the volunteer team"
          subtitle="Short forms, fast follow-up. Tell us how you want to help — we will connect you with the right lead."
        />
        <VolunteerSignupForm />
      </SectionShell>

      <SectionShell id="signing-alerts" muted>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="Get signing alerts"
              subtitle="Reminders for signing opportunities, pop-up tables, and drive-and-sign events near you."
              className="!mb-6"
            />
            <SigningAlertsForm />
          </div>
          <div>
            <SectionHeading
              title="Host a signing location"
              subtitle="Churches, businesses, and community spaces help voters participate on their schedule."
              className="!mb-6"
            />
            <HostLocationForm />
          </div>
        </div>
      </SectionShell>

      <SectionShell id="leadership-form">
        <SectionHeading
          title="Leadership interest"
          subtitle="Tell us about your experience and why you want to help lead — we are building ward teams with clear expectations."
        />
        <LeadershipInterestForm />
      </SectionShell>

      {/* FAQ */}
      <SectionShell id="faq" muted>
        <SectionHeading
          title="Frequently asked questions"
          subtitle="Straight answers first — browse by topic."
        />
        <FaqSection />
        <p className="mt-6 text-sm text-muted-foreground">
          Want the full FAQ page?{" "}
          <Link href="/faq" className="font-semibold text-primary underline-offset-4 hover:underline">
            Open the FAQ hub (preview)
          </Link>
          .
        </p>
      </SectionShell>

      {/* Social proof */}
      <SectionShell id="movement">
        <SectionHeading
          title={site.movement.title}
          subtitle={site.movement.subtitle}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {site.movement.stats.map((s) => (
            <Card
              key={s.label}
              className="rounded-2xl border-border/80 bg-secondary/30 p-6 text-center shadow-sm"
            >
              <p className="font-display text-4xl font-extrabold text-primary">
                {s.value}
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {site.movement.quotes.map((q) => (
            <Card
              key={q.quote}
              className="rounded-2xl border-border/80 p-6 shadow-sm"
            >
              <Quote className="size-8 text-primary/40" aria-hidden />
              <p className="mt-3 text-lg leading-relaxed text-foreground">{q.quote}</p>
              <p className="mt-4 text-sm font-semibold text-muted-foreground">
                — {q.attribution}
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">{site.movement.partners}</p>
      </SectionShell>

      <AskAjaxWidget />

      <FinalCTABand />
    </main>
  );
}
