import Link from "next/link";

import { Card } from "@/components/ui/card";
import { organizing } from "@/content/organizing";
import type { MyOrganizerRow, WardTeamStats } from "@/lib/organizing/types";

import { CopyReferralButton } from "@/components/wards/copy-referral-button";

export function WardDashboardPanel({
  wardSlug,
  wardLabel,
  me,
  directRecruits,
  downstreamTotal,
  rank,
  stats,
}: {
  wardSlug: string;
  wardLabel: string;
  me: MyOrganizerRow;
  directRecruits: number;
  downstreamTotal: number;
  rank: number | null;
  stats: WardTeamStats | null;
}) {
  const encouragement =
    directRecruits === 0
      ? organizing.encourage.zero
      : directRecruits >= me.commitment_goal
        ? organizing.encourage.full
        : organizing.encourage.partial(directRecruits, me.commitment_goal);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">
          {organizing.dashboardWelcome(me.display_name)}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {wardLabel} · your momentum, your team
        </p>
      </div>

      <Card className="rounded-2xl border-primary/20 bg-primary/5 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Today&apos;s nudge
        </p>
        <p className="mt-2 text-lg leading-relaxed text-foreground">{encouragement}</p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl p-5">
          <p className="text-xs font-medium uppercase text-muted-foreground">Direct recruits</p>
          <p className="font-display mt-1 text-3xl font-bold text-primary">
            {directRecruits}{" "}
            <span className="text-lg font-semibold text-muted-foreground">
              / {me.commitment_goal}
            </span>
          </p>
        </Card>
        <Card className="rounded-2xl p-5">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            Downstream total
          </p>
          <p className="font-display mt-1 text-3xl font-bold text-primary">
            {downstreamTotal}
          </p>
        </Card>
        <Card className="rounded-2xl p-5">
          <p className="text-xs font-medium uppercase text-muted-foreground">Ward rank</p>
          <p className="font-display mt-1 text-3xl font-bold text-primary">
            {rank != null ? `#${rank}` : "—"}
          </p>
        </Card>
        <Card className="rounded-2xl p-5">
          <p className="text-xs font-medium uppercase text-muted-foreground">Organizers in ward</p>
          <p className="font-display mt-1 text-3xl font-bold text-primary">
            {stats?.organizer_count ?? "—"}
          </p>
        </Card>
      </div>

      <Card className="rounded-2xl border-border p-6">
        <h2 className="font-display text-xl font-bold text-primary">Your referral tools</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Share your code so recruits land under you on the board. Codes are unique per organizer.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <code className="rounded-lg bg-muted px-3 py-2 font-mono text-lg font-semibold">
            {me.referral_code}
          </code>
          <CopyReferralButton label="Copy code" value={me.referral_code} />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Invite path for your recruits:{" "}
          <code className="break-all text-foreground">
            /wards/{wardSlug}/join?ref={me.referral_code}
          </code>
        </p>
      </Card>

      <Card className="rounded-2xl border-border p-6">
        <h2 className="font-display text-xl font-bold text-primary">{organizing.trainTitle}</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
          {organizing.trainBullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <Link
          href="/training"
          className="mt-4 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Open training previews
        </Link>
      </Card>
    </div>
  );
}
