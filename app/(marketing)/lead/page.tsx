import type { Metadata } from "next";

import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { PrimaryButton } from "@/components/cta/primary-button";
import { LeadershipInterestForm } from "@/components/forms/leadership-interest-form";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Express interest in leading ward teams and outreach for AJAX.",
};

export default function LeadPage() {
  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading
        title="Leadership interest"
        subtitle="Ward captains and team leads will receive structured onboarding in Phase 2."
      />
      <LeadershipInterestForm />
      <div className="mt-10">
        <PrimaryButton href="/volunteer#ladder">Review the engagement ladder</PrimaryButton>
      </div>
    </SectionShell>
  );
}
