import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InitiativeSubnav } from "@/components/initiative/initiative-subnav";
import { DrillDownShell, ProseBlock } from "@/components/initiative/drill-down-shell";
import { childChunks, getGuideChunk, guideChunkIds } from "@/content/petition-guide-chunks";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return guideChunkIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chunk = getGuideChunk(slug);
  if (!chunk) return { title: "Petition guide" };
  return {
    title: chunk.title,
    description: chunk.surface,
  };
}

export default async function PetitionGuideRulePage({ params }: Props) {
  const { slug } = await params;
  const chunk = getGuideChunk(slug);
  if (!chunk) notFound();

  const kids = childChunks(chunk.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <InitiativeSubnav className="mb-10" />
      <DrillDownShell
        className="px-0 py-0 sm:px-0 sm:py-0"
        eyebrow="Petition guide"
        title={chunk.title}
        subtitle={chunk.surface}
        crumbs={[
          { label: "Initiative", href: "/initiative" },
          { label: "Petition guide", href: "/initiative/petition-guide" },
          { label: chunk.title, href: `/initiative/petition-guide/rules/${chunk.id}` },
        ]}
        showDisclaimer
      >
        {kids.length ? (
          <ProseBlock heading="Go narrower" kicker="Subtopics">
            <ul className="list-inside list-disc space-y-2">
              {kids.map((k) => (
                <li key={k.id}>
                  <Link href={`/initiative/petition-guide/rules/${k.id}`} className="text-primary underline-offset-4 hover:underline">
                    {k.title}
                  </Link>
                </li>
              ))}
            </ul>
          </ProseBlock>
        ) : null}

        {chunk.deeper.map((d) => (
          <ProseBlock key={d.heading} heading={d.heading} kicker="Deeper">
            <p>{d.body}</p>
          </ProseBlock>
        ))}

        {chunk.nittyGritty?.length ? (
          <ProseBlock heading="Nitty-gritty" kicker="For coordinators & legal hooks">
            <div className="space-y-4">
              {chunk.nittyGritty.map((n) => (
                <div key={n.heading}>
                  <p className="font-semibold text-foreground">{n.heading}</p>
                  <p className="mt-1">{n.body}</p>
                </div>
              ))}
            </div>
          </ProseBlock>
        ) : null}

        {chunk.statuteRefs?.length ? (
          <ProseBlock heading="Official references" kicker="Primary sources">
            <ul className="list-inside list-disc space-y-2">
              {chunk.statuteRefs.map((r) => (
                <li key={r.href}>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </ProseBlock>
        ) : null}

        <p>
          <Link href="/initiative/petition-guide" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
            ← Back to petition guide hub
          </Link>
        </p>
      </DrillDownShell>
    </div>
  );
}
