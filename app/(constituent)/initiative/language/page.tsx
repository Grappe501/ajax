import type { Metadata } from "next";

import { InitiativeLegalSection } from "@/components/initiative/initiative-legal-section";
import { InitiativePageShell } from "@/components/initiative/initiative-page-shell";
import { AskAjaxPlaceholder, ReadAloudPlaceholder } from "@/components/initiative/petition-placeholders";
import { Card } from "@/components/ui/card";
import {
  ballotTitle,
  initiativeLanguageMeta,
  initiativePlainOverview,
  initiativeSections,
  popularName,
} from "@/content/initiativeLanguage";

export const metadata: Metadata = {
  title: initiativeLanguageMeta.title,
  description: initiativeLanguageMeta.description,
};

export default function InitiativeLanguagePage() {
  return (
    <InitiativePageShell>
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Initiative</p>
        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {initiativeLanguageMeta.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{initiativeLanguageMeta.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <ReadAloudPlaceholder label="Read aloud (soon)" />
          <AskAjaxPlaceholder prefill="Explain the Jacksonville ward-based initiative in plain language." />
        </div>
      </header>

      <section className="space-y-4" aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="font-display text-xl font-bold text-foreground">
          {initiativePlainOverview.title}
        </h2>
        <p className="leading-relaxed text-muted-foreground">{initiativePlainOverview.body}</p>
      </section>

      <section id="ballot-title" className="mt-10 scroll-mt-24 space-y-6" aria-labelledby="ballot-title-heading">
        <h2 id="ballot-title-heading" className="font-display text-xl font-bold text-foreground">
          Popular name & ballot title
        </h2>
        <Card className="rounded-2xl border-primary/20 bg-card p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Popular name</p>
          <p className="mt-2 font-medium text-foreground">{popularName}</p>
          <p className="mt-6 text-xs font-bold uppercase tracking-wide text-muted-foreground">Ballot title</p>
          <p className="mt-2 text-foreground">{ballotTitle}</p>
        </Card>
      </section>

      <div className="mt-10">
        <p className="text-xs text-muted-foreground">
          Optional: add official PDF page exports as images for side-by-side reading.
        </p>
        <div className="mt-3 max-w-xl rounded-xl border border-dashed border-border bg-muted/20 p-4 text-center text-sm text-muted-foreground">
          Place <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">page-2.png</code> /{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">page-3.png</code> in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">/public/petition/</code> when
          available.
        </div>
      </div>

      <section className="mt-14 space-y-6" aria-labelledby="sections-heading">
        <h2 id="sections-heading" className="font-display text-xl font-bold text-foreground">
          Ordinance by section
        </h2>
        <p className="text-sm text-muted-foreground">
          Replace bracketed placeholders with verbatim language from the petition PDF (pages 2–3).
        </p>
        <div className="space-y-6">
          {initiativeSections.map((s) => (
            <InitiativeLegalSection
              key={s.id}
              shortTitle={s.shortTitle}
              legalText={s.legalText}
              plainEnglish={s.plainEnglish}
              whyMatters={s.whyMatters}
            />
          ))}
        </div>
      </section>
    </InitiativePageShell>
  );
}
