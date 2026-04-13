"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import type { OutreachQueueRow } from "@/lib/admin/queries";
import { markOutreachSent } from "@/lib/reach/actions";
import { Button } from "@/components/ui/button";

export function OutreachQueueClient({ rows }: { rows: OutreachQueueRow[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[720px] text-left text-sm text-zinc-300">
        <thead className="border-b border-white/10 bg-[#070f1c] text-xs font-bold uppercase tracking-wide text-zinc-500">
          <tr>
            <th className="px-4 py-3">When</th>
            <th className="px-4 py-3">Ward / organizer</th>
            <th className="px-4 py-3">Channel</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Message</th>
            <th className="px-4 py-3 w-32" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-white/5 align-top">
              <td className="px-4 py-3 whitespace-nowrap text-zinc-400">
                {new Date(r.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <p className="font-semibold text-white">{r.organizer_display_name ?? "—"}</p>
                <p className="text-xs text-zinc-500">{r.organizer_ward_slug ?? ""}</p>
              </td>
              <td className="px-4 py-3 uppercase">{r.channel}</td>
              <td className="px-4 py-3 text-xs">
                {r.channel === "sms" ? (
                  <span className="text-zinc-200">{r.contact_phone ?? "—"}</span>
                ) : (
                  <span className="text-zinc-200">{r.contact_email ?? "—"}</span>
                )}
              </td>
              <td className="px-4 py-3 max-w-md">
                {r.message_subject ? (
                  <p className="text-xs font-semibold text-[#fdb913]">{r.message_subject}</p>
                ) : null}
                <p className="mt-1 whitespace-pre-wrap text-zinc-400">{r.message_body}</p>
              </td>
              <td className="px-4 py-3">
                <Button
                  type="button"
                  size="sm"
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                  disabled={pending}
                  onClick={() => {
                    startTransition(async () => {
                      await markOutreachSent(r.id);
                      router.refresh();
                    });
                  }}
                >
                  {pending ? <Loader2 className="size-4 animate-spin" /> : "Mark sent"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
