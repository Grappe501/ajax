import type { Metadata } from "next";

import { SecondaryButton } from "@/components/cta/secondary-button";
import { WhyJacksonvilleContent } from "@/components/marketing/why-jacksonville-content";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Why it matters",
  description:
    "Why ward-based representation matters for neighborhoods, accountability, and elections in Jacksonville.",
};

export default function WhyItMattersPage() {
  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading
        title={site.whyJacksonville.title}
        subtitle={site.whyJacksonville.subtitle}
      />
      <WhyJacksonvilleContent />
      <div className="mt-12 flex flex-wrap gap-4 border-t border-border/60 pt-10">
        <SecondaryButton href="/campaign">Read the campaign overview</SecondaryButton>
        <SecondaryButton href="/volunteer">Volunteer with AJAX</SecondaryButton>
      </div>
    </SectionShell>
  );
}
