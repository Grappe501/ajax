import type { Metadata } from "next";
import Link from "next/link";

import { InitiativeSubnav } from "@/components/initiative/initiative-subnav";
import { DrillDownShell, ProseBlock } from "@/components/initiative/drill-down-shell";
import { petitionLitigation } from "@/content/petition-litigation";

export const metadata: Metadata = {
  title: petitionLitigation.meta.title,
  description: petitionLitigation.meta.description,
};

export default function LitigationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <InitiativeSubnav className="mb-10" />
      <DrillDownShell
        className="px-0 py-0 sm:px-0 sm:py-0"
        eyebrow="Federal court"
        title={petitionLitigation.meta.title}
        subtitle={petitionLitigation.surfaceSummary}
        crumbs={[
          { label: "Initiative", href: "/initiative" },
          { label: "Law hub", href: "/initiative/law" },
          { label: "Litigation", href: "/initiative/law/litigation" },
        ]}
        showDisclaimer
      >
        <ProseBlock heading="Case bookmark" kicker="Docket">
          <p className="font-semibold text-foreground">{petitionLitigation.case.name}</p>
          <p className="mt-1 text-sm">{petitionLitigation.case.court}</p>
          <p className="mt-1 text-sm text-muted-foreground">Docket (reported): {petitionLitigation.case.docketHint}</p>
          <p className="mt-3">
            <a
              href={petitionLitigation.case.courtListenerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              CourtListener docket →
            </a>
          </p>
        </ProseBlock>

        {petitionLitigation.whatInjunctionMeans.map((w) => (
          <ProseBlock key={w.heading} heading={w.heading} kicker="Meaning">
            <p>{w.body}</p>
          </ProseBlock>
        ))}

        <ProseBlock heading="News & explainers" kicker="Secondary reporting">
          <ul className="list-inside list-disc space-y-2">
            {petitionLitigation.reportingLinks.map((r) => (
              <li key={r.href}>
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </ProseBlock>

        <p className="rounded-2xl border border-border/80 bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          {petitionLitigation.disclaimer}
        </p>

        <p>
          <Link href="/initiative/law" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
            ← Law hub
          </Link>
        </p>
      </DrillDownShell>
    </div>
  );
}
