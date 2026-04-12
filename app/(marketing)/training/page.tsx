import type { Metadata } from "next";
import Link from "next/link";

import { SecondaryButton } from "@/components/cta/secondary-button";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { TrainingPreview } from "@/components/sections/training-preview";

export const metadata: Metadata = {
  title: "Training center",
  description:
    "AJAX volunteer training — interactive Articulate 360 modules and field resources (rolling out).",
};

export default function TrainingPage() {
  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading
        eyebrow="Version 2"
        title="Training center"
        subtitle="Self-paced modules built in Articulate 360 will embed here alongside PDFs and coordinator-led sessions. Until those publishes go live, use the rules hub and the module previews below."
      />
      <div className="rounded-2xl border border-dashed border-primary/25 bg-primary/[0.04] px-5 py-6 text-sm leading-relaxed text-muted-foreground">
        <p className="font-display text-base font-semibold text-foreground">
          Interactive modules — coming soon
        </p>
        <p className="mt-2">
          The campaign is finalizing Articulate 360 packages for petition basics, witnessing,
          tabling, and organizing. When each course is published, it will appear in this space as
          an embedded player so volunteers can train on phones or desktops without leaving the site.
        </p>
        <p className="mt-3">
          There is no separate state certificate required for AJAX volunteers — this center is our
          shared standard. Read the{" "}
          <Link
            href="/rules"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            petition rules hub
          </Link>{" "}
          first; modules will reinforce the same expectations.
        </p>
      </div>
      <div className="mt-10">
        <TrainingPreview />
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <SecondaryButton href="/rules">Petition rules & procedures</SecondaryButton>
        <SecondaryButton href="/volunteer">Join the volunteer team</SecondaryButton>
      </div>
    </SectionShell>
  );
}
