"use client";

import {
  ArrowRight,
  BookOpen,
  Handshake,
  Heart,
  PenLine,
} from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionReveal } from "@/components/motion/section-reveal";
import { useAssistant } from "@/components/assistant/assistant-context";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: "01",
    title: "Land with clarity",
    body: "No jargon wall. Skim the initiative explainer or ask the AJAX Guide — same friendly voice everywhere.",
    icon: BookOpen,
    href: "/initiative",
    cta: "Read the explainer",
  },
  {
    step: "02",
    title: "See why it matters",
    body: "Ward voice isn’t an abstract idea — it’s schools, streets, and accountability in your neighborhood.",
    icon: Heart,
    href: "/why-it-matters",
    cta: "Why it matters",
  },
  {
    step: "03",
    title: "Choose your lane",
    body: "Sign when you’re ready, volunteer when you have capacity — or both, on your timeline.",
    icon: PenLine,
    href: "/events",
    cta: "Events & signing",
  },
  {
    step: "04",
    title: "Stay connected",
    body: "Alerts, trainings, and neighbor-to-neighbor momentum — without pressure tactics.",
    icon: Handshake,
    href: "/connect",
    cta: "Get updates",
  },
] as const;

export function WelcomeJourney() {
  const { openAssistant } = useAssistant();

  return (
    <SectionShell className="ajax-section-muted border-b border-primary/10">
      <SectionHeading
        eyebrow="Your path"
        title="Welcoming by design"
        subtitle="We built this front door for every kind of visitor — curious, cautious, or ready to act. Move in order, or jump to what fits today."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((s, i) => (
          <SectionReveal key={s.step}>
            <div
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-6 shadow-ajax transition duration-300",
                "hover:-translate-y-1 hover:border-primary/20 hover:shadow-ajax-lg",
              )}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-accent/25 to-transparent blur-2xl"
                aria-hidden
              />
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-xs font-bold tabular-nums text-primary/60">
                  {s.step}
                </span>
                <s.icon className="size-7 text-primary opacity-90" aria-hidden />
              </div>
              <h3 className="font-display mt-4 text-lg font-bold tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1 text-sm font-bold text-primary transition group-hover:gap-1.5"
                >
                  {s.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                {i === 0 ? (
                  <button
                    type="button"
                    onClick={() => openAssistant("Summarize what AJAX is in two short paragraphs.")}
                    className="text-sm font-semibold text-muted-foreground underline-offset-4 transition hover:text-primary hover:underline"
                  >
                    Ask the guide
                  </button>
                ) : null}
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </SectionShell>
  );
}
