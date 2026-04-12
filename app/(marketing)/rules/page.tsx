import type { Metadata } from "next";

import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { PrimaryButton } from "@/components/cta/primary-button";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { RuleAccordion } from "@/components/sections/rule-accordion";

export const metadata: Metadata = {
  title: "Petition rules",
  description:
    "Arkansas law context, Jacksonville eligibility, witnessing, VoterView checks, and petition procedures for AJAX volunteers.",
};

export default function RulesPage() {
  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading
        eyebrow="Volunteer playbook"
        title="Petition rules & procedures"
        subtitle="State-law background, Jacksonville-specific signer checks, and practical field guidance — open each topic for detail."
      />
      <RuleAccordion />
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <PrimaryButton href="/training">Training center</PrimaryButton>
        <SecondaryButton href="/volunteer">Join the team</SecondaryButton>
        <SecondaryButton href="/">Back to homepage</SecondaryButton>
      </div>
    </SectionShell>
  );
}
