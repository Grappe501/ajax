import { GitBranch, Target, Users } from "lucide-react";

import { organizing } from "@/content/organizing";
import type { WardTeamStats } from "@/lib/organizing/types";

export function RelationalOrganizingIntro({
  stats,
}: {
  stats: WardTeamStats | null;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
        <h2 className="font-display text-2xl font-bold text-primary">
          {organizing.ladderTitle}
        </h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          {organizing.ladderBody}
        </p>
        <ul className="mt-6 space-y-4">
          <li className="flex gap-3">
            <Users className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="font-semibold">{organizing.commitmentLabel}</p>
              <p className="text-sm text-muted-foreground">
                {organizing.commitmentExplainer}
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <GitBranch className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="font-semibold">Downstream reach</p>
              <p className="text-sm text-muted-foreground">
                Your score grows when people you bring in build their own teams — that is
                how wards accelerate.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <Target className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="font-semibold">Friendly competition</p>
              <p className="text-sm text-muted-foreground">
                Leaderboards celebrate momentum, not pressure. We train first, celebrate
                progress, and keep the ladder honest.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Ward pulse
        </p>
        {stats ? (
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="text-xs text-muted-foreground">Organizers building</dt>
              <dd className="font-display text-3xl font-bold text-primary">
                {stats.organizer_count}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">New this week</dt>
              <dd className="font-display text-2xl font-bold text-primary">
                {stats.new_this_week}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Connect Supabase to show live ward stats.
          </p>
        )}
      </div>
    </div>
  );
}
