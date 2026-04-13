import type { Metadata } from "next";

import { InitiativePageShell } from "@/components/initiative/initiative-page-shell";
import { PetitionCoach } from "@/components/initiative/petition-coach";
import { PetitionOfficialPdf } from "@/components/petition/petition-official-pdf";
import { petitionCoachMeta } from "@/content/petition-coach";

export const metadata: Metadata = {
  title: petitionCoachMeta.title,
  description: petitionCoachMeta.description,
};

export default function InteractivePetitionPage() {
  return (
    <InitiativePageShell wide>
      <PetitionCoach />
      <div id="official-petition-pdf" className="mt-16 max-w-5xl scroll-mt-28 border-t border-border/80 pt-12">
        <PetitionOfficialPdf />
      </div>
    </InitiativePageShell>
  );
}
