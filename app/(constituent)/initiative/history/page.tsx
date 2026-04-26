import type { Metadata } from "next";
import Link from "next/link";

import { InitiativeSubnav } from "@/components/initiative/initiative-subnav";
import { ballotHistoryIntro, decadeBlocks } from "@/content/ballot-history-decades";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: ballotHistoryIntro.title,
  description: ballotHistoryIntro.subtitle,
};

export default function BallotHistoryHubPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <InitiativeSubnav className="mb-10" />
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Arkansas & U.S.</p>
      <h1 className="font-display mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">{ballotHistoryIntro.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{ballotHistoryIntro.subtitle}</p>
      <p className="mt-3 text-sm text-muted-foreground">{ballotHistoryIntro.disclaimer}</p>

      <section className="mt-10 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6">
        <h2 className="font-display text-lg font-bold text-foreground">National context (surface)</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Ballot initiatives spread during the Progressive Era as a check on legislatures captured by railroads, trusts, and
          urban machines. States adopted different signature formulas, subject-matter limits, and judicial review norms —
          Arkansas’s 1910 amendment fit that wave, even though usage matured more slowly than in California or the Mountain
          West.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-foreground">Decades — click to drill down</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Each decade page starts with a short story, then lists notable measures as we archive them. Empty decades are
          invitations for research pushes, not mistakes.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {decadeBlocks.map((d) => (
            <Link key={d.id} href={`/initiative/history/${d.id}`} className="group block">
              <Card className="h-full rounded-2xl border-border/80 p-4 transition group-hover:border-primary/30">
                <p className="font-display text-2xl font-bold text-primary">{d.label}</p>
                <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">{d.arkansasContext}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-primary">Open decade →</span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-10">
        <Link href="/initiative/law" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
          ← Law hub
        </Link>
      </p>
    </div>
  );
}
