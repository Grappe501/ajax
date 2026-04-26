import type { Metadata } from "next";
import Link from "next/link";

import { InitiativeSubnav } from "@/components/initiative/initiative-subnav";
import { DrillDownShell, ProseBlock } from "@/components/initiative/drill-down-shell";

export const metadata: Metadata = {
  title: "Statewide vs. municipal ballot measures",
  description:
    "How Arkansas local initiatives differ from Secretary of State petitions — and why Jacksonville volunteers should not mix the playbooks.",
};

export default function StatewideAndLocalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <InitiativeSubnav className="mb-10" />
      <DrillDownShell
        className="px-0 py-0 sm:px-0 sm:py-0"
        eyebrow="Nuances"
        title="Statewide measures vs. Jacksonville’s petition"
        subtitle="Both trace back to Article 5, § 1 — but the filing desk, math, and political optics are different."
        crumbs={[
          { label: "Initiative", href: "/initiative" },
          { label: "Law hub", href: "/initiative/law" },
          { label: "Statewide vs. local", href: "/initiative/law/statewide-and-local" },
        ]}
        showDisclaimer
      >
        <ProseBlock heading="Surface-level takeaway" kicker="Start here">
          <p>
            If cable news talks about petitions, it is usually describing statewide initiated acts or constitutional
            amendments filed with the Secretary of State. AJAX is asking Jacksonville voters to place a city measure on the
            ballot — think city clerk, charter, and municipal code — not the statewide pipeline.
          </p>
        </ProseBlock>

        <ProseBlock heading="Deeper: two different ecosystems" kicker="Drill down">
          <p>
            Statewide campaigns worry about Attorney General certification, massive signature pools, county distribution
            formulas, and SOS verification debates. Municipal sponsors worry about charter language, clerk calendars,
            residency of signers inside city limits, and notary batches that match local forms.
          </p>
          <p>
            2025’s legislature imported some statewide circulator standards into local option work — that is why volunteers
            hear about residency rules or background checks even for city measures. The campaign’s counsel connects those
            dots for this specific petition.
          </p>
        </ProseBlock>

        <ProseBlock heading="Nitty-gritty: where to read" kicker="Sources">
          <ul className="list-inside list-disc space-y-2">
            <li>
              <a
                href="https://law.justia.com/constitution/arkansas/article-5.html"
                className="text-primary underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Arkansas Constitution — Article 5 (Justia)
              </a>
            </li>
            <li>
              <a
                href="https://law.justia.com/codes/arkansas/title-14/subtitle-2/chapter-14/subchapter-9/section-14-14-915/"
                className="text-primary underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                A.C.A. § 14-14-915 — local initiative & referendum requirements (verify current)
              </a>
            </li>
            <li>
              <a
                href="https://ballotpedia.org/Laws_governing_local_ballot_measures_in_Arkansas"
                className="text-primary underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ballotpedia — local ballot measure summary
              </a>
            </li>
          </ul>
        </ProseBlock>

        <p>
          <Link href="/initiative/law" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
            ← Law hub
          </Link>
        </p>
      </DrillDownShell>
    </div>
  );
}
