import { MessageCircleWarning } from "lucide-react";

import { Card } from "@/components/ui/card";

/** Phase 2+: grounded assistant. Phase 1 placeholder only. */
export function AskAjaxWidget() {
  return (
    <section aria-label="Ask AJAX assistant placeholder" className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="rounded-2xl border-dashed border-primary/30 bg-card/80 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <MessageCircleWarning
                className="size-10 shrink-0 text-primary"
                aria-hidden
              />
              <div>
                <p className="font-display text-lg font-bold text-primary">
                  Ask AJAX (coming soon)
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  A beta assistant may answer short questions using approved campaign
                  content only — never legal advice. For now, use the FAQ or contact
                  the team.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
