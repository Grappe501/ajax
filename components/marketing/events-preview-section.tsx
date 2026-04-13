"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import { PrimaryButton } from "@/components/cta/primary-button";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { Card } from "@/components/ui/card";
import { ANALYTICS_EVENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

/** Homepage teaser — real listings live on /events (Supabase). */
export function EventsPreviewSection() {
  return (
    <SectionShell id="events">
      <SectionHeading
        title="Upcoming events"
        subtitle="The central calendar is volunteer-driven: propose a signing shift or table, then coordinators post it after a quick review."
      />
      <Card className="rounded-2xl border-border/80 bg-card/90 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CalendarDays className="size-6" aria-hidden />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-foreground">Live event calendar</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                See what&apos;s scheduled, add your own outreach, and browse field playbooks as we
                publish them.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="/events" className="justify-center">
              Open calendar
            </PrimaryButton>
            <Link
              href="/events/submit"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
              onClick={() => trackEvent(ANALYTICS_EVENT.eventCta)}
            >
              List an event
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Card>
    </SectionShell>
  );
}
