import type { Metadata } from "next";

import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { PrimaryButton } from "@/components/cta/primary-button";
import { RuleAccordion } from "@/components/sections/rule-accordion";

export const metadata: Metadata = {
  title: "Petition rules",
  description: "Plain-language rules and procedures for petition signing.",
};

export default function RulesPage() {
  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading
        title="Petition rules hub"
        subtitle="Expanded legal references and printable checklists will join this page in Phase 2."
      />
      <RuleAccordion />
      <div className="mt-10">
        <PrimaryButton href="/">Back to homepage</PrimaryButton>
      </div>
    </SectionShell>
  );
}
