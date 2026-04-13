import type { Metadata } from "next";
import Link from "next/link";

import { CampaignEventCard } from "@/components/events/campaign-event-card";
import { OpportunityGuides } from "@/components/events/opportunity-guides";
import { PrimaryButton } from "@/components/cta/primary-button";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { site } from "@/content/site";
import { listApprovedUpcomingCampaignEvents } from "@/lib/campaign-events/queries";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Central calendar for signature collection and outreach — listed by volunteers, reviewed by coordinators.",
};

export default async function EventsPage() {
  const configured = isSupabaseConfigured();
  const result = await listApprovedUpcomingCampaignEvents();

  const showList = result.status === "ok";
  const events = result.status === "ok" ? result.events : [];
  const hasDemo = events.some((e) => e.is_demo);
  const loadError = result.status === "error";

  return (
    <SectionShell className="min-h-[50vh]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          className="mb-0"
          title="Event calendar"
          subtitle="Volunteers propose signature drives, tables, trainings, and more. Entries appear here after a quick coordinator review — demo items are labeled so nobody plans around placeholders."
        />
        <div className="flex flex-wrap gap-3">
          <PrimaryButton href="/events/submit">List an event</PrimaryButton>
          <SecondaryButton href="/volunteer">Volunteer hub</SecondaryButton>
        </div>
      </div>

      {!configured ? (
        <div className="mt-8 rounded-2xl border border-amber-400/50 bg-amber-50/80 p-5 text-sm text-amber-950 dark:bg-amber-950/30 dark:text-amber-50">
          <p className="font-display font-bold">Calendar database not connected</p>
          <p className="mt-2 leading-relaxed">
            Add Supabase environment variables on the server, then run the latest migration in{" "}
            <code className="rounded bg-black/10 px-1 py-0.5 text-xs">supabase/migrations</code> so
            volunteer submissions can save and display here.
          </p>
          <p className="mt-3">
            Until then, email{" "}
            <a href={`mailto:${site.footer.email}`} className="font-semibold underline">
              {site.footer.email}
            </a>{" "}
            to list an event.
          </p>
        </div>
      ) : null}

      {configured && loadError ? (
        <p className="mt-8 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          We couldn&apos;t load events right now. Refresh in a moment, or email {site.footer.email}.
        </p>
      ) : null}

      {configured && showList && hasDemo ? (
        <p className="mt-8 rounded-xl border border-amber-400/50 bg-amber-50/60 px-4 py-3 text-sm text-amber-950 dark:bg-amber-950/25 dark:text-amber-50">
          <span className="font-bold">Demo</span> rows are examples only — not real meetups. Real
          listings appear the same way once coordinators approve them.
        </p>
      ) : null}

      {configured && showList && events.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
          <p className="font-display text-lg font-bold text-foreground">No upcoming events listed yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Be the first to add a signing shift or table — it goes to coordinators for a quick review,
            then shows up here.
          </p>
          <PrimaryButton href="/events/submit" className="mt-6 justify-center">
            List an event
          </PrimaryButton>
        </div>
      ) : null}

      {configured && showList && events.length > 0 ? (
        <ul className="mt-10 grid list-none gap-6 p-0">
          {events.map((ev) => (
            <li key={ev.id}>
              <CampaignEventCard event={ev} />
            </li>
          ))}
        </ul>
      ) : null}

      <OpportunityGuides />

      <p className="mt-12 text-center text-sm text-muted-foreground">
        Need help listing an event?{" "}
        <Link href={`mailto:${site.footer.email}`} className="font-semibold text-primary underline-offset-4 hover:underline">
          {site.footer.email}
        </Link>
      </p>
    </SectionShell>
  );
}
