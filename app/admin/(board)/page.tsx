import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Users } from "lucide-react";

import { getCampaignPulse } from "@/lib/admin/queries";

export const metadata: Metadata = {
  title: "Overview",
};

export default async function AdminOverviewPage() {
  const pulse = await getCampaignPulse();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
          Operations overview
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Approvals, privileges, and the Co-pilot live here — one board for coordinators and owners.
          Numbers refresh when you load the page.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Clock}
          label="Events awaiting review"
          value={pulse?.pending_events ?? "—"}
          tone="amber"
        />
        <StatCard
          icon={CheckCircle2}
          label="Approved on calendar"
          value={pulse?.approved_events ?? "—"}
          tone="emerald"
        />
        <StatCard
          icon={CheckCircle2}
          label="Rejected / held back"
          value={pulse?.rejected_events ?? "—"}
          tone="zinc"
        />
        <StatCard
          icon={Users}
          label="Ward organizers (app)"
          value={pulse?.organizers ?? "—"}
          tone="sky"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#070f1c] p-6">
          <h2 className="font-display text-lg font-bold text-white">Approval queue</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Volunteer-submitted events stay hidden from the public calendar until you approve them
            here.
          </p>
          <Link
            href="/admin/approvals"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#fdb913] hover:underline"
          >
            Open approvals
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#070f1c] p-6">
          <h2 className="font-display text-lg font-bold text-white">Co-pilot</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Ask for daily priorities, backlog triage ideas, and rhythm suggestions — grounded in live
            pulse data from this database.
          </p>
          <Link
            href="/admin/co-pilot"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#fdb913] hover:underline"
          >
            Open co-pilot
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  tone: "amber" | "emerald" | "zinc" | "sky";
}) {
  const ring =
    tone === "amber"
      ? "from-amber-500/20 to-transparent"
      : tone === "emerald"
        ? "from-emerald-500/20 to-transparent"
        : tone === "sky"
          ? "from-sky-500/20 to-transparent"
          : "from-zinc-500/15 to-transparent";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070f1c] p-5">
      <div
        className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${ring} blur-2xl`}
        aria-hidden
      />
      <Icon className="size-5 text-zinc-500" aria-hidden />
      <p className="mt-3 text-3xl font-bold tabular-nums tracking-tight text-white">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
    </div>
  );
}
