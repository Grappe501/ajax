import { Quote } from "lucide-react";

import { Card } from "@/components/ui/card";
import { site } from "@/content/site";

export function MovementPageContent() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {site.movement.stats.map((s) => (
          <Card
            key={s.label}
            className="flex flex-col rounded-2xl border-border/80 bg-secondary/30 p-6 text-center shadow-sm"
          >
            <p className="font-display text-4xl font-extrabold tabular-nums text-primary">{s.value}</p>
            <p className="mt-2 text-sm font-semibold leading-snug text-foreground">{s.label}</p>
            {"hint" in s && s.hint ? (
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{s.hint}</p>
            ) : null}
          </Card>
        ))}
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {site.movement.revisitNote}
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {site.movement.quotes.map((q) => (
          <Card key={q.quote} className="rounded-2xl border-border/80 p-6 shadow-sm">
            <Quote className="size-8 text-primary/40" aria-hidden />
            <p className="mt-3 text-lg leading-relaxed text-foreground">{q.quote}</p>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">— {q.attribution}</p>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">{site.movement.partners}</p>
    </>
  );
}
