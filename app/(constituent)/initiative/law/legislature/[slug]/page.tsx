import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InitiativeSubnav } from "@/components/initiative/initiative-subnav";
import { DrillDownShell, ProseBlock } from "@/components/initiative/drill-down-shell";
import { getLegislationBySlug, legislationSlugs } from "@/content/petition-legislation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return legislationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = getLegislationBySlug(slug);
  if (!e) return { title: "Legislation" };
  return {
    title: `${e.bill} (${e.act})`,
    description: e.surface,
  };
}

export default async function LegislatureDetailPage({ params }: Props) {
  const { slug } = await params;
  const e = getLegislationBySlug(slug);
  if (!e) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <InitiativeSubnav className="mb-10" />
      <DrillDownShell
        className="px-0 py-0 sm:px-0 sm:py-0"
        eyebrow={`${e.bill} · ${e.act}`}
        title={e.shortTitle}
        subtitle={e.surface}
        crumbs={[
          { label: "Initiative", href: "/initiative" },
          { label: "Law hub", href: "/initiative/law" },
          { label: "Legislature", href: "/initiative/law/legislature" },
          { label: e.bill, href: `/initiative/law/legislature/${e.slug}` },
        ]}
        showDisclaimer
      >
        {e.litigationWatch ? (
          <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-950 dark:text-amber-100">
            <strong>Litigation watch:</strong> News reporting and federal dockets describe challenges to parts of Arkansas’s
            2025 direct-democracy package. Confirm current enforceability with counsel — especially before changing field
            scripts.{" "}
            <Link href="/initiative/law/litigation" className="font-semibold underline underline-offset-4">
              Read the litigation primer →
            </Link>
          </p>
        ) : null}

        <ProseBlock heading="Plain-language analysis" kicker="Volunteer education">
          <div className="space-y-4">
            {e.analysis.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ProseBlock>

        <ProseBlock heading="Jacksonville / AJAX angle" kicker="Local framing">
          <p>{e.jacksonvilleNote}</p>
        </ProseBlock>

        <ProseBlock heading="Official tracking & reporting" kicker="Sources">
          <ul className="list-inside list-disc space-y-2">
            <li>
              <a
                href={e.arklegQueryPath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                Arkansas Legislature / code reference
              </a>
            </li>
            {e.sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </ProseBlock>

        <p className="flex flex-wrap gap-4">
          <Link href="/initiative/law/legislature" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
            ← Legislature index
          </Link>
          <Link href="/initiative/law" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
            Law hub
          </Link>
        </p>
      </DrillDownShell>
    </div>
  );
}
