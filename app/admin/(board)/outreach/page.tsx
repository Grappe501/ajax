import type { Metadata } from "next";

import { OutreachQueueClient } from "@/components/admin/outreach-queue-client";
import { listPendingOutreachQueue } from "@/lib/admin/queries";

export const metadata: Metadata = {
  title: "Outreach queue",
};

export default async function AdminOutreachPage() {
  const rows = await listPendingOutreachQueue();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
          Outreach queue
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Volunteers queue suggested copy and contact info. Staff send from campaign accounts (SendGrid
          / SMS wiring next).
        </p>
      </div>

      {!rows?.length ? (
        <p className="text-sm text-zinc-500">No pending outreach requests.</p>
      ) : (
        <OutreachQueueClient rows={rows} />
      )}
    </div>
  );
}
