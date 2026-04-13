import type { Metadata } from "next";

import { InitiativePageShell } from "@/components/initiative/initiative-page-shell";
import { NotaryCautionSection } from "@/components/initiative/notary/notary-caution-section";
import { NotaryChecklistSection } from "@/components/initiative/notary/notary-checklist-section";
import { NotaryFaqAccordion } from "@/components/initiative/notary/notary-faq-accordion";
import { NotaryHero } from "@/components/initiative/notary/notary-hero";
import { NotaryRelatedLinks } from "@/components/initiative/notary/notary-related-links";
import { NotaryRoleCompare } from "@/components/initiative/notary/notary-role-compare";
import { NotarySignupForm } from "@/components/initiative/notary/notary-signup-form";
import { NotaryStepProcess } from "@/components/initiative/notary/notary-step-process";
import { NotaryWhySection } from "@/components/initiative/notary/notary-why-section";
import { PetitionNotaryHighlight } from "@/components/initiative/notary/petition-notary-highlight";
import { notaryPageMeta } from "@/content/notaryPage";

export const metadata: Metadata = {
  title: notaryPageMeta.title,
  description: notaryPageMeta.description,
  openGraph: {
    title: `${notaryPageMeta.title} · AJAX`,
    description: notaryPageMeta.description,
    type: "article",
  },
};

export default function NotariesPage() {
  return (
    <InitiativePageShell>
      <div className="space-y-16 pb-8">
        <NotaryHero />
        <NotaryWhySection />
        <PetitionNotaryHighlight />
        <NotaryRoleCompare />
        <NotaryStepProcess />
        <NotaryChecklistSection />
        <NotaryCautionSection />
        <NotaryFaqAccordion />
        <NotarySignupForm />
        <NotaryRelatedLinks />
      </div>
    </InitiativePageShell>
  );
}
