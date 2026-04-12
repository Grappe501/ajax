import type { Metadata } from "next";

import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { PrimaryButton } from "@/components/cta/primary-button";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Signing events, trainings, and community tables for the AJAX campaign.",
};

export default function EventsPage() {
  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading
        title="Event calendar"
        subtitle="Phase 2 will add a full calendar with filters and RSVP. For now, jump back to the homepage preview or contact the team."
      />
      <PrimaryButton href="/">Back to homepage</PrimaryButton>
      <p className="mt-6 text-sm text-muted-foreground">
        Need something listed? Email{" "}
        <a href="mailto:hello@ajaxcampaign.org" className="font-semibold text-primary">
          hello@ajaxcampaign.org
        </a>
        .
      </p>
    </SectionShell>
  );
}
