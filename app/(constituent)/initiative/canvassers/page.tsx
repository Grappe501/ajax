import type { Metadata } from "next";
import Link from "next/link";

import { InitiativePageShell } from "@/components/initiative/initiative-page-shell";
import { AskAjaxPlaceholder, ReadAloudPlaceholder } from "@/components/initiative/petition-placeholders";
import { PrimaryButton } from "@/components/cta/primary-button";
import { Card } from "@/components/ui/card";
import { canvasserPage, canvasserPageMeta } from "@/content/initiative-audience-pages";

export const metadata: Metadata = {
  title: canvasserPageMeta.title,
  description: canvasserPageMeta.description,
};

export default function CanvassersPage() {
  return (
    <InitiativePageShell>
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Field</p>
        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {canvasserPageMeta.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{canvasserPageMeta.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <ReadAloudPlaceholder label="Read aloud (soon)" />
          <AskAjaxPlaceholder prefill="What must a Jacksonville petition canvasser verify and witness?" />
        </div>
      </header>

      <p className="leading-relaxed text-muted-foreground">{canvasserPage.intro}</p>

      <ul className="mt-6 space-y-3">
        {canvasserPage.bullets.map((b) => (
          <li key={b} className="flex gap-3 text-sm text-muted-foreground">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden />
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>

      <Card className="mt-10 rounded-2xl border-border/80 bg-muted/20 p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{canvasserPage.legalNote}</p>
      </Card>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <PrimaryButton href="/initiative/petition" className="justify-center">
          Open interactive petition
        </PrimaryButton>
        <PrimaryButton href={canvasserPage.relatedHref} variant="secondary" className="justify-center">
          Full instructions — canvassers
        </PrimaryButton>
      </div>

      <p className="mt-12 text-center text-xs text-muted-foreground">
        <Link href="/initiative/how-to-sign" className="font-medium text-primary underline-offset-4 hover:underline">
          Signer how-to
        </Link>
        {" · "}
        <Link href="/initiative/notaries" className="font-medium text-primary underline-offset-4 hover:underline">
          Notary page
        </Link>
      </p>
    </InitiativePageShell>
  );
}
