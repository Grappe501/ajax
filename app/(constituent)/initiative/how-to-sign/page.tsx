import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { InitiativePageShell } from "@/components/initiative/initiative-page-shell";
import { AskAjaxPlaceholder, ReadAloudPlaceholder } from "@/components/initiative/petition-placeholders";
import { Card } from "@/components/ui/card";
import {
  commonMistakes,
  disabilityAssistance,
  howToSignMeta,
  reassurance,
  whatToProvide,
  whoCanSign,
} from "@/content/how-to-sign";

export const metadata: Metadata = {
  title: howToSignMeta.title,
  description: howToSignMeta.description,
};

export default function HowToSignPage() {
  return (
    <InitiativePageShell>
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Signers</p>
        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {howToSignMeta.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{howToSignMeta.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <ReadAloudPlaceholder label="Read aloud (soon)" />
          <AskAjaxPlaceholder prefill="What do I need to write on the Jacksonville petition when I sign?" />
        </div>
      </header>

      <section className="space-y-4" aria-labelledby="who-heading">
        <h2 id="who-heading" className="font-display text-xl font-bold text-foreground">
          {whoCanSign.title}
        </h2>
        <p className="leading-relaxed text-muted-foreground">{whoCanSign.body}</p>
      </section>

      <section className="mt-10" aria-labelledby="provide-heading">
        <h2 id="provide-heading" className="font-display text-xl font-bold text-foreground">
          {whatToProvide.title}
        </h2>
        <ul className="mt-4 space-y-3">
          {whatToProvide.items.map((item) => (
            <li key={item} className="flex gap-3 text-muted-foreground">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <Card className="mt-10 rounded-2xl border-border/80 bg-card p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-foreground">{disabilityAssistance.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{disabilityAssistance.body}</p>
      </Card>

      <section className="mt-10" aria-labelledby="mistakes-heading">
        <h2 id="mistakes-heading" className="font-display text-xl font-bold text-foreground">
          {commonMistakes.title}
        </h2>
        <ul className="mt-4 space-y-3">
          {commonMistakes.items.map((item) => (
            <li key={item} className="flex gap-3 text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <Card className="mt-10 rounded-2xl border-primary/25 bg-primary/[0.06] p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-primary">{reassurance.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{reassurance.body}</p>
      </Card>
    </InitiativePageShell>
  );
}
