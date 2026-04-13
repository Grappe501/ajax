import { Shield, Users, Workflow } from "lucide-react";

import { Card } from "@/components/ui/card";
import { whyNotariesMatter } from "@/content/notaryPage";

const icons = [Shield, Users, Workflow] as const;

export function NotaryWhySection() {
  return (
    <section className="space-y-6" aria-labelledby="why-notaries-heading">
      <div>
        <h2 id="why-notaries-heading" className="font-display text-2xl font-bold text-foreground">
          {whyNotariesMatter.title}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{whyNotariesMatter.intro}</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-3">
        {whyNotariesMatter.cards.map((c, i) => {
          const Icon = icons[i] ?? Shield;
          return (
            <li key={c.title}>
              <Card className="h-full rounded-2xl border-border/80 bg-card p-5 shadow-sm transition hover:border-primary/25">
                <Icon className="size-9 text-primary" aria-hidden />
                <h3 className="font-display mt-3 text-base font-bold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </Card>
            </li>
          );
        })}
      </ul>
      <p className="text-sm text-muted-foreground">
        Notaries do not fill out voter lines. Signers use the signature table; canvassers complete their affidavit; you
        complete the notary block only.
      </p>
    </section>
  );
}
