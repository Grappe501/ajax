import type { Metadata } from "next";
import Link from "next/link";

import { InitiativeSubnav } from "@/components/initiative/initiative-subnav";
import { guideChunks } from "@/content/petition-guide-chunks";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Petition guide — chunked rules",
  description:
    "Start with a short summary of each petition rule cluster, then drill down line by line — without drowning in legalese.",
};

export default function PetitionGuideHubPage() {
  const roots = guideChunks.filter((c) => c.parentId === null);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <InitiativeSubnav className="mb-10" />
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Petition guide</p>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-4xl">
        Learn one layer at a time
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Each card is written for volunteers and curious neighbors. Open a topic for the short version, then keep scrolling
        for deeper context and statute links.
      </p>

      <div className="mt-10 space-y-4">
        {roots.map((c) => (
          <Link key={c.id} href={`/initiative/petition-guide/rules/${c.id}`} className="group block">
            <Card className="rounded-2xl border-border/80 p-5 transition group-hover:border-primary/30 group-hover:shadow-md">
              <h2 className="font-display text-lg font-bold text-primary group-hover:underline">{c.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.surface}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-primary">Drill down →</span>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Pair with</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>
            <Link href="/initiative/law" className="text-primary underline-offset-4 hover:underline">
              Arkansas law & history hub
            </Link>
          </li>
          <li>
            <Link href="/initiative/instructions" className="text-primary underline-offset-4 hover:underline">
              Full written instructions
            </Link>
          </li>
          <li>
            <Link href="/rules" className="text-primary underline-offset-4 hover:underline">
              Rules accordion (marketing site)
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
