import type { Metadata } from "next";

import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { PrimaryButton } from "@/components/cta/primary-button";

export const metadata: Metadata = {
  title: "Resources",
  description: "Downloads and links for AJAX volunteers (Phase 2 expansion).",
};

export default function ResourcesPage() {
  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading
        title="Resource library"
        subtitle="Handbooks, printable guides, and partner toolkits will live here in Phase 2."
      />
      <ul className="list-inside list-disc space-y-2 text-muted-foreground">
        <li>
          <a href="/canvass/map" className="font-semibold text-primary underline-offset-4 hover:underline">
            Field canvass map
          </a>{" "}
          (Google Maps + voter pins — sign in required)
        </li>
        <li>Petition quick guide (PDF) — link TBD</li>
        <li>Volunteer onboarding packet — link TBD</li>
        <li>Partner messaging one-pager — link TBD</li>
      </ul>
      <div className="mt-8">
        <PrimaryButton href="/">Back to homepage</PrimaryButton>
      </div>
    </SectionShell>
  );
}
