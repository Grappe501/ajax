"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { approveCampaignEvent, rejectCampaignEvent } from "@/lib/admin/actions";
import type { PendingEventRow } from "@/lib/admin/queries";
import type { CampaignAdminRole } from "@/lib/admin/auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function canModerate(role: CampaignAdminRole) {
  return role === "owner" || role === "coordinator";
}

export function PendingEventsTable({
  rows,
  role,
}: {
  rows: PendingEventRow[];
  role: CampaignAdminRole;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const mod = canModerate(role);

  async function approve(id: string) {
    setBusy(id);
    const r = await approveCampaignEvent(id);
    setBusy(null);
    if (r.ok) router.refresh();
    else alert(r.error);
  }

  async function reject(id: string, note: string) {
    setBusy(id);
    const r = await rejectCampaignEvent(id, note);
    setBusy(null);
    if (r.ok) router.refresh();
    else alert(r.error);
  }

  if (rows.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-white/15 bg-[#070f1c] px-6 py-10 text-center text-sm text-zinc-500">
        Nothing in the queue. New volunteer submissions will land here first.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {rows.map((row) => (
        <article
          key={row.id}
          className="rounded-2xl border border-white/10 bg-[#070f1c] p-5 shadow-lg md:p-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                {row.event_kind.replace(/_/g, " ")}
              </p>
              <h2 className="font-display text-lg font-bold text-white">{row.title}</h2>
              <p className="mt-1 text-sm text-zinc-400">{row.location_label}</p>
              <p className="mt-2 text-xs text-zinc-500">
                Organizer: {row.organizer_name} ·{" "}
                <a href={`mailto:${row.organizer_email}`} className="text-[#fdb913] hover:underline">
                  {row.organizer_email}
                </a>
              </p>
              {row.is_demo ? (
                <span className="mt-2 inline-block rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-300">
                  Demo row
                </span>
              ) : null}
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                disabled={!mod || busy === row.id}
                className="bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={() => void approve(row.id)}
              >
                Approve
              </Button>
            </div>
          </div>
          <RejectBlock
            disabled={!mod || busy === row.id}
            onReject={(note) => void reject(row.id, note)}
          />
        </article>
      ))}
      {!mod ? (
        <p className="text-xs text-zinc-500">
          Your role is <span className="font-semibold text-zinc-400">analyst</span> — view only on
          approvals. Coordinators and owners can moderate.
        </p>
      ) : null}
    </div>
  );
}

function RejectBlock({
  disabled,
  onReject,
}: {
  disabled: boolean;
  onReject: (note: string) => void;
}) {
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(true)}
        className={cn(
          "mt-4 text-xs font-semibold text-red-400/90 hover:underline disabled:opacity-40",
        )}
      >
        Reject with note…
      </button>
    );
  }

  return (
    <div className="mt-4 rounded-xl border border-red-500/20 bg-red-950/20 p-4">
      <p className="text-xs font-medium text-red-300/90">Optional note (internal)</p>
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        className="mt-2 border-white/10 bg-[#050a12] text-sm text-zinc-100"
        placeholder="Reason — not shown publicly on the site today"
      />
      <div className="mt-2 flex gap-2">
        <Button
          type="button"
          size="sm"
          variant="destructive"
          disabled={disabled}
          onClick={() => onReject(note)}
        >
          Confirm reject
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
