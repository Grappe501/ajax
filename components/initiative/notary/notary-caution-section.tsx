import { AlertTriangle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { notaryDoNot } from "@/content/notaryPage";

export function NotaryCautionSection() {
  return (
    <section className="space-y-4" aria-labelledby="caution-heading">
      <h2 id="caution-heading" className="font-display text-2xl font-bold text-foreground">
        {notaryDoNot.title}
      </h2>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{notaryDoNot.intro}</p>
      <ul className="space-y-3">
        {notaryDoNot.items.map((item) => (
          <li key={item}>
            <Card className="rounded-xl border border-amber-600/25 bg-amber-500/[0.07] p-4 shadow-sm">
              <div className="flex gap-3">
                <AlertTriangle
                  className="mt-0.5 size-5 shrink-0 text-amber-800 dark:text-amber-500"
                  aria-hidden
                />
                <p className="text-sm leading-relaxed text-foreground">{item}</p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
