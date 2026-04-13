"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake, MapPin, PenLine } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { site } from "@/content/site";

const startIcons = {
  understand: BookOpen,
  sign: PenLine,
  volunteer: HeartHandshake,
  lead: MapPin,
} as const;

export function StartHereCards() {
  return (
    <SectionShell id="start-here" muted>
      <SectionHeading
        title="Start here"
        subtitle="Pick a path — each topic has its own page with room to grow as the campaign does."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {site.startHere.map((card) => {
          const Icon = startIcons[card.id as keyof typeof startIcons];
          return (
            <Link
              key={card.id}
              href={card.href}
              className="group relative flex gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-5 shadow-ajax backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-ajax-lg"
            >
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 transition group-hover:opacity-100"
                aria-hidden
              />
              <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/12 to-primary/5 text-primary shadow-inner ring-1 ring-primary/10">
                <Icon className="size-6" aria-hidden />
              </span>
              <span>
                <span className="font-display text-lg font-bold text-foreground group-hover:text-primary">
                  {card.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{card.description}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Open page
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </SectionShell>
  );
}
