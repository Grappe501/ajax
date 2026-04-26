import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InitiativeSubnav } from "@/components/initiative/initiative-subnav";
import { decadeIds, getDecade } from "@/content/ballot-history-decades";

type Props = { params: Promise<{ decade: string }> };

export async function generateStaticParams() {
  return decadeIds().map((decade) => ({ decade }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { decade } = await params;
  const d = getDecade(decade);
  if (!d) return { title: "History" };
  return {
    title: `Ballot history — ${d.label}`,
    description: d.arkansasContext.slice(0, 155),
  };
}

export default async function DecadePage({ params }: Props) {
  const { decade } = await params;
  const d = getDecade(decade);
  if (!d) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <InitiativeSubnav className="mb-10" />
      <nav className="mb-8 text-xs font-semibold text-muted-foreground">
        <Link href="/initiative/history" className="text-primary underline-offset-4 hover:underline">
          Ballot history
        </Link>{" "}
        / {d.label}
      </nav>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Decade study</p>
      <h1 className="font-display mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">{d.label} Arkansas ballot notes</h1>

      <section className="mt-10 rounded-2xl border border-border/80 bg-card/90 p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-foreground">United States backdrop</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.usContext}</p>
      </section>

      <section className="mt-8 rounded-2xl border border-border/80 bg-card/90 p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-foreground">Arkansas thread</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.arkansasContext}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-bold text-foreground">Measures on record (seed list)</h2>
        {d.measures.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No seeded measures for this decade yet — pull clerk PDFs, SOS archives, and Ballotpedia exports into this content
            module when you expand the archive.
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {d.measures.map((m) => (
              <li key={`${m.year}-${m.shortName}`} className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <span>{m.year}</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{m.result}</span>
                </div>
                <p className="mt-2 font-semibold text-foreground">{m.shortName}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.blurb}</p>
                {m.href ? (
                  <a href={m.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">
                    Read more →
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-10">
        <Link href="/initiative/history" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
          ← History hub
        </Link>
      </p>
    </div>
  );
}
