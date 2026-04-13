import type { Metadata } from "next";

import { SecondaryButton } from "@/components/cta/secondary-button";
import { MovementPageContent } from "@/components/marketing/movement-page-content";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Movement",
  description:
    "Momentum, volunteer energy, and partner organizations supporting AJAX — updated as the campaign publishes numbers.",
};

export default function MovementPage() {
  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading title={site.movement.title} subtitle={site.movement.subtitle} />
      <MovementPageContent />
      <div className="mt-12 flex flex-wrap gap-4 border-t border-border/60 pt-10">
        <SecondaryButton href="/volunteer">Join the volunteer team</SecondaryButton>
        <SecondaryButton href="/events">See events</SecondaryButton>
      </div>
    </SectionShell>
  );
}
