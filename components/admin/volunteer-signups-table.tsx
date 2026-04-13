"use client";

import type { VolunteerSignupRow } from "@/lib/admin/queries";

const HELP_KEYS = [
  ["help_event_volunteer", "Events"],
  ["help_petition_carrier", "Petition carrier"],
  ["help_church_outreach", "Church outreach"],
  ["help_tabling", "Tabling"],
  ["help_phone_text", "Phone / text"],
  ["help_hosting", "Hosting"],
  ["help_leadership", "Leadership"],
] as const;

function interestSummary(row: VolunteerSignupRow): string {
  const parts: string[] = [];
  for (const [key, label] of HELP_KEYS) {
    if (row[key]) parts.push(label);
  }
  return parts.length ? parts.join(" · ") : "—";
}

export function VolunteerSignupsTable({ rows }: { rows: VolunteerSignupRow[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-white/15 bg-[#070f1c] px-6 py-10 text-center text-sm text-zinc-500">
        No volunteer form submissions yet. They appear here when someone completes the form on{" "}
        <code className="rounded bg-white/10 px-1 text-xs">/volunteer</code> with Supabase connected.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#070f1c]">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-zinc-500">
            <th className="px-4 py-3 font-semibold">When</th>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Contact</th>
            <th className="px-4 py-3 font-semibold">ZIP</th>
            <th className="px-4 py-3 font-semibold">Interests</th>
            <th className="px-4 py-3 font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-white/5 text-zinc-300 last:border-0">
              <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-500">
                {new Date(row.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-3 font-medium text-white">
                {row.first_name} {row.last_name}
              </td>
              <td className="px-4 py-3 text-xs">
                <a href={`mailto:${row.email}`} className="text-[#fdb913] hover:underline">
                  {row.email}
                </a>
                <br />
                <span className="text-zinc-500">{row.phone}</span>
              </td>
              <td className="px-4 py-3 text-xs">{row.zip_code}</td>
              <td className="max-w-[220px] px-4 py-3 text-xs leading-snug text-zinc-400">
                {interestSummary(row)}
              </td>
              <td className="max-w-[200px] px-4 py-3 text-xs text-zinc-500">
                {row.notes?.trim() || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
