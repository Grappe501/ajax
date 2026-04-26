import type { Metadata } from "next";
import Link from "next/link";

import { InitiativeSubnav } from "@/components/initiative/initiative-subnav";
import { DrillDownShell, ProseBlock } from "@/components/initiative/drill-down-shell";

export const metadata: Metadata = {
  title: "Filing, notary & petition training",
  description:
    "Progressive links from quick field habits to full instructions, notary guides, and the chunked petition rulebook.",
};

const layers = [
  {
    title: "30-second field habits",
    body:
      "VoterView before ink, blue ballpoint, one witness per sheet story, never backdate — if you only remember four things, remember those.",
    href: "/initiative/mistakes",
    hrefLabel: "Common mistakes",
  },
  {
    title: "10-minute volunteer read",
    body: "Walk the initiative overview, how to sign, and canvasser etiquette before you table.",
    href: "/initiative/how-to-sign",
    hrefLabel: "How to sign",
  },
  {
    title: "Full instructions & affidavit discipline",
    body: "Coordinator-level detail on lines, corrections, custody, and notary appointments.",
    href: "/initiative/instructions",
    hrefLabel: "Full instructions",
  },
  {
    title: "Notary-specific depth",
    body: "Public notary guide plus compact hub PDF embed for people administering oaths.",
    href: "/initiative/notaries",
    hrefLabel: "Notary guide",
  },
  {
    title: "Rule clusters & statutes",
    body: "Chunked topics with statutory references — use when training leads need talking points tied to law.",
    href: "/initiative/petition-guide",
    hrefLabel: "Petition guide hub",
  },
] as const;

export default function FilingTrainingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <InitiativeSubnav className="mb-10" />
      <DrillDownShell
        className="px-0 py-0 sm:px-0 sm:py-0"
        eyebrow="Training ladder"
        title="Filing & notary training — layered"
        subtitle="Start shallow, drill down only when you need to. Each link is a deliberate step deeper."
        crumbs={[
          { label: "Initiative", href: "/initiative" },
          { label: "Law hub", href: "/initiative/law" },
          { label: "Filing & training", href: "/initiative/law/filing-training" },
        ]}
        showDisclaimer
      >
        <div className="space-y-6">
          {layers.map((layer, i) => (
            <ProseBlock key={layer.title} heading={layer.title} kicker={`Layer ${i + 1}`}>
              <p>{layer.body}</p>
              <p className="pt-2">
                <Link href={layer.href} className="font-semibold text-primary underline-offset-4 hover:underline">
                  {layer.hrefLabel} →
                </Link>
              </p>
            </ProseBlock>
          ))}
        </div>

        <ProseBlock heading="Operator workspace" kicker="Internal tools">
          <p>
            Organizers using the volunteer hub can open{" "}
            <Link href="/hub/notary" className="font-semibold text-primary underline-offset-4 hover:underline">
              /hub/notary
            </Link>{" "}
            for the compact training layout.
          </p>
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
