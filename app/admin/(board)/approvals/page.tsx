import type { Metadata } from "next";

import { PendingEventsTable } from "@/components/admin/pending-events-table";
import { getCampaignAdminSession } from "@/lib/admin/auth";
import { listPendingCampaignEvents } from "@/lib/admin/queries";

export const metadata: Metadata = {
  title: "Approvals",
};

export default async function AdminApprovalsPage() {
  const session = await getCampaignAdminSession();
  const rows = await listPendingCampaignEvents();
  const role = session.ok ? session.role : "analyst";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Event approvals</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Every volunteer-submitted calendar item stays <strong className="text-zinc-300">pending</strong>{" "}
          until a coordinator publishes it. Approvals sync to the public{" "}
          <code className="rounded bg-white/10 px-1 text-xs">/events</code> page immediately.
        </p>
      </div>
      <PendingEventsTable rows={rows ?? []} role={role} />
    </div>
  );
}
