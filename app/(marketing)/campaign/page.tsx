import type { Metadata } from "next";

import { CampaignPageContent } from "@/components/marketing/campaign-page-content";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "The campaign",
  description:
    "What the AJAX petition does, how Jacksonville’s at-large system works, and what ward-based voting changes.",
};

export default function CampaignPage() {
  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading
        eyebrow="Plain language"
        title={site.whatCampaign.title}
        subtitle="How the city votes for council today — and what putting a measure on the ballot can change."
      />
      <CampaignPageContent />
      <div className="mt-12 flex flex-wrap gap-4 border-t border-border/60 pt-10">
        <SecondaryButton href="/why-it-matters">Why it matters in Jacksonville</SecondaryButton>
        <SecondaryButton href="/rules">Petition rules & procedures</SecondaryButton>
        <SecondaryButton href="/volunteer">Volunteer</SecondaryButton>
      </div>
    </SectionShell>
  );
}
