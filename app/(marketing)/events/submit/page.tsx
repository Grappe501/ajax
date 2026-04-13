import type { Metadata } from "next";
import Link from "next/link";

import { CampaignEventForm } from "@/components/events/campaign-event-form";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { site } from "@/content/site";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "List an event",
  description: "Propose a signature collection or outreach event for the AJAX calendar.",
};

export default function SubmitEventPage() {
  const configured = isSupabaseConfigured();

  return (
    <SectionShell className="min-h-[50vh]">
      <SecondaryButton href="/events" className="mb-6 w-fit">
        ← Back to calendar
      </SecondaryButton>
      <SectionHeading
        title="List an event"
        subtitle="Share when, where, who you are gathering, and how the format will work. Coordinators review submissions before they go live on the public calendar."
      />

      {!configured ? (
        <div className="mt-8 rounded-2xl border border-amber-400/50 bg-amber-50/80 p-5 text-sm text-amber-950 dark:bg-amber-950/30 dark:text-amber-50">
          <p className="font-display font-bold">Form unavailable — database not configured</p>
          <p className="mt-2">
            Email{" "}
            <a href={`mailto:${site.footer.email}`} className="font-semibold underline">
              {site.footer.email}
            </a>{" "}
            with your event details until Supabase is connected.
          </p>
        </div>
      ) : (
        <CampaignEventForm className="mt-8 max-w-2xl" />
      )}

      <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
        Questions about rules or materials? See{" "}
        <Link href="/rules" className="font-medium text-primary underline-offset-4 hover:underline">
          petition rules
        </Link>{" "}
        and{" "}
        <Link href="/resources" className="font-medium text-primary underline-offset-4 hover:underline">
          resources
        </Link>
        .
      </p>
    </SectionShell>
  );
}
