import type { Metadata } from "next";
import Link from "next/link";

import { InitiativeSubnav } from "@/components/initiative/initiative-subnav";
import { legislationEntries, legislationIndexIntro } from "@/content/petition-legislation";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Arkansas ballot law & history",
  description:
    "Statewide vs. Jacksonville measures, legislation deep dives, litigation context, and a decade-by-decade history scaffold.",
};

export default function LawHubPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <InitiativeSubnav className="mb-10" />
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Law & civics</p>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-4xl">
        {legislationIndexIntro.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{legislationIndexIntro.subtitle}</p>
      <p className="mt-3 text-sm text-muted-foreground">{legislationIndexIntro.footnote}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/initiative/law/statewide-and-local" className="group block">
          <Card className="h-full rounded-2xl border-border/80 p-5 transition group-hover:border-primary/30">
            <h2 className="font-display font-bold text-primary">Statewide vs. local</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Why TV coverage of SOS petitions is not the same as a city clerk filing.
            </p>
          </Card>
        </Link>
        <Link href="/initiative/law/filing-training" className="group block">
          <Card className="h-full rounded-2xl border-border/80 p-5 transition group-hover:border-primary/30">
            <h2 className="font-display font-bold text-primary">Filing, notary & training</h2>
            <p className="mt-2 text-sm text-muted-foreground">Layered links from quick steps to affidavit detail.</p>
          </Card>
        </Link>
        <Link href="/initiative/law/legislature" className="group block">
          <Card className="h-full rounded-2xl border-border/80 p-5 transition group-hover:border-primary/30">
            <h2 className="font-display font-bold text-primary">Legislation tracker</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Thirteen deep dives — twelve enacted laws plus a municipal statute spotlight.
            </p>
          </Card>
        </Link>
        <Link href="/initiative/law/litigation" className="group block">
          <Card className="h-full rounded-2xl border-border/80 p-5 transition group-hover:border-primary/30">
            <h2 className="font-display font-bold text-primary">Courts & injunctions</h2>
            <p className="mt-2 text-sm text-muted-foreground">What a preliminary injunction does (and does not) do.</p>
          </Card>
        </Link>
        <Link href="/initiative/history" className="group block sm:col-span-2">
          <Card className="h-full rounded-2xl border-border/80 p-5 transition group-hover:border-primary/30">
            <h2 className="font-display font-bold text-primary">Ballot measure history</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              U.S. context, Arkansas 1910 adoption, decade cards — built to expand over time.
            </p>
          </Card>
        </Link>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-xl font-bold text-foreground">Quick legislation index</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {legislationEntries.map((e) => (
            <li key={e.slug}>
              <Link href={`/initiative/law/legislature/${e.slug}`} className="text-primary underline-offset-4 hover:underline">
                {e.act} — {e.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
