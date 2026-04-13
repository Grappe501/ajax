import { Card } from "@/components/ui/card";

/** One ordinance section: legal excerpt + plain English + why it matters. */
export function InitiativeLegalSection({
  shortTitle,
  legalText,
  plainEnglish,
  whyMatters,
}: {
  shortTitle: string;
  legalText: string;
  plainEnglish: string;
  whyMatters: string;
}) {
  return (
    <Card className="overflow-hidden rounded-2xl border-border/80 shadow-sm">
      <div className="border-b border-border/60 bg-muted/30 px-5 py-3">
        <h3 className="font-display text-base font-bold text-primary">{shortTitle}</h3>
      </div>
      <div className="space-y-4 px-5 py-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Legal text (summary)</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{legalText}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Plain English</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plainEnglish}</p>
        </div>
        <div className="rounded-xl border border-[#fdb913]/35 bg-[#fdb913]/10 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Why this matters</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{whyMatters}</p>
        </div>
      </div>
    </Card>
  );
}
