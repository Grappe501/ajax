import { Trophy } from "lucide-react";

import type { LeaderboardRow } from "@/lib/organizing/types";
import { organizing } from "@/content/organizing";

export function WardLeaderboard({
  rows,
  wardName,
}: {
  rows: LeaderboardRow[] | null;
  wardName: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <Trophy className="mt-1 size-8 shrink-0 text-accent" aria-hidden />
        <div>
          <h2 className="font-display text-xl font-bold text-primary">
            {organizing.leaderboardTitle}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {organizing.leaderboardSubtitle}
          </p>
          <p className="mt-1 text-xs font-medium text-muted-foreground">{wardName}</p>
        </div>
      </div>

      {!rows?.length ? (
        <p className="mt-6 text-sm text-muted-foreground">
          No organizers on the board yet — join and invite your five.
        </p>
      ) : (
        <ol className="mt-6 space-y-3">
          {rows.map((r, i) => (
            <li
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/70 bg-background/60 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{r.display_name}</p>
                  <p className="text-xs text-muted-foreground">
                    Code: <span className="font-mono">{r.referral_code}</span>
                  </p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p className="font-bold text-primary">{r.downstream_total} downstream</p>
                <p className="text-xs text-muted-foreground">
                  {r.direct_recruits} / {r.commitment_goal} direct
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
