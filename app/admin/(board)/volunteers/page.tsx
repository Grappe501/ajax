import type { Metadata } from "next";

import { VolunteerSignupsTable } from "@/components/admin/volunteer-signups-table";
import { listVolunteerSignups } from "@/lib/admin/queries";

export const metadata: Metadata = {
  title: "Volunteers",
};

export default async function AdminVolunteersPage() {
  const rows = await listVolunteerSignups();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Volunteer signups</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Submissions from the public{" "}
          <code className="rounded bg-white/10 px-1 text-xs">/volunteer</code> form when the site is
          connected to Supabase. Follow up by email or phone — this list is coordinator-only.
        </p>
      </div>
      <VolunteerSignupsTable rows={rows ?? []} />
    </div>
  );
}
