import type { Metadata } from "next";
import Link from "next/link";

import { InitiativeSubnav } from "@/components/initiative/initiative-subnav";
import { legislationEntries, legislationIndexIntro } from "@/content/petition-legislation";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Arkansas legislation — petition deep dives",
  description: legislationIndexIntro.subtitle,
};

export default function LegislatureIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <InitiativeSubnav className="mb-10" />
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Legislation</p>
      <h1 className="font-display mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">Thirteen law capsules</h1>
      <p className="mt-4 text-muted-foreground">{legislationIndexIntro.subtitle}</p>

      <div className="mt-10 space-y-4">
        {legislationEntries.map((e) => (
          <Link key={e.slug} href={`/initiative/law/legislature/${e.slug}`} className="group block">
            <Card className="rounded-2xl border-border/80 p-5 transition group-hover:border-primary/35">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <span>{e.bill}</span>
                <span aria-hidden>·</span>
                <span>{e.act}</span>
                {e.sessionYear ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{e.sessionYear}</span>
                  </>
                ) : null}
                {e.litigationWatch ? (
                  <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-900 dark:text-amber-200">
                    Litigation watch
                  </span>
                ) : null}
              </div>
              <h2 className="font-display mt-2 text-lg font-bold text-primary group-hover:underline">{e.shortTitle}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{e.surface}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-primary">Full analysis →</span>
            </Card>
          </Link>
        ))}
      </div>

      <p className="mt-10">
        <Link href="/initiative/law" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
          ← Law hub
        </Link>
      </p>
    </div>
  );
}
