import type { Metadata } from "next";

import { AskAjaxPlaceholder } from "@/components/initiative/petition-placeholders";
import { PrimaryButton } from "@/components/cta/primary-button";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { InteractiveFaqSection } from "@/components/sections/interactive-faq-section";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Searchable answers about the petition, signing, volunteering, and events — plus the AJAX Guide.",
};

export default function FaqPage() {
  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading
        title="Frequently asked questions"
        subtitle="Search across every answer, browse by topic, or open the AJAX Guide for a conversational walkthrough. Same trusted content as the volunteer hub — optimized for sharing."
      />
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <AskAjaxPlaceholder prefill="I have a question about the Jacksonville petition or volunteering." />
        <PrimaryButton href="/initiative/petition" variant="secondary">
          Petition Coach
        </PrimaryButton>
      </div>
      <InteractiveFaqSection />
      <div className="mt-12 flex flex-wrap gap-4">
        <PrimaryButton href="/hub">Volunteer hub</PrimaryButton>
        <PrimaryButton href="/" variant="secondary">
          Back to homepage
        </PrimaryButton>
      </div>
    </SectionShell>
  );
}
