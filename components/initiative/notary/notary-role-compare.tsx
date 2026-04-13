import { Check, X } from "lucide-react";

import { Card } from "@/components/ui/card";
import { whatNotaryNotarizes } from "@/content/notaryPage";

export function NotaryRoleCompare() {
  return (
    <section className="space-y-6" aria-labelledby="notary-role-heading">
      <div>
        <h2 id="notary-role-heading" className="font-display text-2xl font-bold text-foreground">
          {whatNotaryNotarizes.title}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{whatNotaryNotarizes.lead}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/40 pl-4">
          {whatNotaryNotarizes.canvasserAffidavitSummary}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-6 shadow-sm">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <Check className="size-5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden />
            {whatNotaryNotarizes.doingTitle}
          </h3>
          <ul className="mt-4 space-y-3">
            {whatNotaryNotarizes.doing.map((line) => (
              <li key={line} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-600/80" aria-hidden />
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-6 shadow-sm">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <X className="size-5 shrink-0 text-rose-700 dark:text-rose-400" aria-hidden />
            {whatNotaryNotarizes.notDoingTitle}
          </h3>
          <ul className="mt-4 space-y-3">
            {whatNotaryNotarizes.notDoing.map((line) => (
              <li key={line} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-600/70" aria-hidden />
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
