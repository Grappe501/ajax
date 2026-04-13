import type { Metadata } from "next";
import Link from "next/link";

import { PrimaryButton } from "@/components/cta/primary-button";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { Card } from "@/components/ui/card";
import { PetitionOfficialPdf } from "@/components/petition/petition-official-pdf";

export const metadata: Metadata = {
  title: "Notary workspace",
  description: "Quick links for notaries — full guide, petition PDF, and hub home.",
};

export default function HubNotaryPage() {
  return (
    <SectionShell>
      <SectionHeading
        title="Notary workspace"
        subtitle="Training view for notaries coordinating with the campaign. For the full recruitment page, use the public notary guide."
      />
      <div className="mb-8 flex flex-wrap gap-3">
        <PrimaryButton href="/initiative/notaries">Full notary public page</PrimaryButton>
        <PrimaryButton href="/initiative/petition" variant="secondary">
          Petition Coach
        </PrimaryButton>
        <PrimaryButton href="/hub" variant="secondary">
          Volunteer hub home
        </PrimaryButton>
      </div>
      <Card className="mb-10 rounded-2xl border-border p-6">
        <h2 className="font-display text-lg font-bold text-foreground">Checklist</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>You notarize the canvasser affidavit — not each voter line.</li>
          <li>Complete only the “FOR NOTARY ONLY” block on the petition part.</li>
          <li>Canvasser must appear before you per standard jurat rules.</li>
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/initiative/canvassers" className="font-semibold text-primary underline-offset-4 hover:underline">
            Canvasser instructions
          </Link>
        </p>
      </Card>
      <PetitionOfficialPdf />
    </SectionShell>
  );
}
