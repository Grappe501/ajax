import Link from "next/link";

import { Card } from "@/components/ui/card";
import { getWardPetitionAlumniPlaceholder } from "@/lib/ward-petition-stats";

export function WardPetitionAlumniPanel({ wardSlug }: { wardSlug: string }) {
  const p = getWardPetitionAlumniPlaceholder(wardSlug);

  return (
    <Card className="rounded-2xl border-violet-500/25 bg-violet-500/[0.06] p-6">
      <h2 className="font-display text-xl font-bold text-primary">Petition alumni in this ward</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Cross-reference of people in <strong>{wardSlug}</strong> who have signed <strong>any</strong> petition we have on
        file (AJAX initiative + historical Jacksonville lists). Counts are illustrative until the import matches voter
        IDs — then each row gets a contact profile and interaction log.
      </p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-background/80 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Total flagged</dt>
          <dd className="font-display mt-1 text-2xl font-bold text-primary">{p.totalInWard}</dd>
        </div>
        <div className="rounded-xl bg-background/80 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">This initiative</dt>
          <dd className="font-display mt-1 text-2xl font-bold text-primary">{p.ajaxInitiative}</dd>
        </div>
        <div className="rounded-xl bg-background/80 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Other petitions</dt>
          <dd className="font-display mt-1 text-2xl font-bold text-primary">{p.otherBallots}</dd>
        </div>
        <div className="rounded-xl bg-background/80 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Matched voter ID</dt>
          <dd className="font-display mt-1 text-2xl font-bold text-primary">{p.matchedToVoterId}</dd>
        </div>
      </dl>
      <p className="mt-4 text-xs text-muted-foreground">
        Campaign manager: comms and finance meters live on{" "}
        <Link href="/admin/campaign-manager" className="font-semibold text-primary underline-offset-2 hover:underline">
          /admin/campaign-manager
        </Link>
        .
      </p>
    </Card>
  );
}
