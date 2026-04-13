import type { Metadata } from "next";

import { InitiativePageShell } from "@/components/initiative/initiative-page-shell";
import { AskAjaxPlaceholder, ReadAloudPlaceholder } from "@/components/initiative/petition-placeholders";
import { Card } from "@/components/ui/card";
import { instructionModules, petitionInstructionsMeta } from "@/content/petitionInstructions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: petitionInstructionsMeta.title,
  description: petitionInstructionsMeta.description,
};

export default function PetitionInstructionsPage() {
  return (
    <InitiativePageShell>
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Official instructions</p>
        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {petitionInstructionsMeta.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{petitionInstructionsMeta.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <ReadAloudPlaceholder label="Read aloud (soon)" />
          <AskAjaxPlaceholder prefill="Summarize signer vs canvasser rules on the Jacksonville petition." />
        </div>
      </header>

      <p className="text-sm text-muted-foreground">
        Jump to:{" "}
        <a href="#signers" className="font-medium text-primary underline-offset-4 hover:underline">
          Signer rules
        </a>
        {" · "}
        <a href="#canvassers" className="font-medium text-primary underline-offset-4 hover:underline">
          Canvasser rules
        </a>
        {" · "}
        <a href="#warnings" className="font-medium text-primary underline-offset-4 hover:underline">
          Fraud &amp; penalties
        </a>
      </p>

      <div className="mt-8 space-y-6">
        {instructionModules.map((m) => (
          <Card
            key={m.id}
            id={m.id}
            className={cn(
              "scroll-mt-24 rounded-2xl border-border/80 p-6 shadow-sm",
              m.tone === "warning" && "border-amber-500/30 bg-amber-500/[0.06]",
            )}
          >
            <h2 className="font-display text-lg font-bold text-foreground">{m.title}</h2>
            <div className="mt-4 space-y-3">
              {m.body.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </InitiativePageShell>
  );
}
