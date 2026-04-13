import { ClipboardCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { beforeNotarizeChecklist } from "@/content/notaryPage";

export function NotaryChecklistSection() {
  return (
    <section aria-labelledby="checklist-heading">
      <Card className="rounded-2xl border-primary/20 bg-primary/[0.04] p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
          <ClipboardCheck className="size-10 shrink-0 text-primary" aria-hidden />
          <div>
            <h2 id="checklist-heading" className="font-display text-xl font-bold text-foreground">
              {beforeNotarizeChecklist.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {beforeNotarizeChecklist.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-0.5 font-bold text-primary" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
}
