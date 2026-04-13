import type { Metadata } from "next";

import { listCampaignAdmins } from "@/lib/admin/queries";

export const metadata: Metadata = {
  title: "Team",
};

export default async function AdminTeamPage() {
  const team = await listCampaignAdmins();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Team & privileges</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Roles are enforced in the database and in server actions.{" "}
          <strong className="text-zinc-300">Owners</strong> and{" "}
          <strong className="text-zinc-300">coordinators</strong> can approve events;{" "}
          <strong className="text-zinc-300">analysts</strong> get read-only insight. Add or change
          admins in Supabase for now — in-app invites can follow.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#070f1c]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3 font-semibold">User ID</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Label</th>
              <th className="px-4 py-3 font-semibold">Since</th>
            </tr>
          </thead>
          <tbody>
            {(team ?? []).map((m) => (
              <tr key={m.user_id} className="border-b border-white/5 text-zinc-300 last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-zinc-400">{m.user_id}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-bold uppercase text-[#fdb913]">
                    {m.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-400">{m.label ?? "—"}</td>
                <td className="px-4 py-3 text-xs text-zinc-500">
                  {new Date(m.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!team?.length ? (
          <p className="px-4 py-8 text-center text-sm text-zinc-500">
            No rows in <code className="text-[#fdb913]">campaign_admins</code> — add your first admin
            in Supabase.
          </p>
        ) : null}
      </div>

      <div className="rounded-2xl border border-[#fdb913]/25 bg-[#fdb913]/5 p-5 text-sm text-zinc-300">
        <p className="font-display font-bold text-[#fdb913]">Bootstrap SQL (run once)</p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-black/40 p-4 text-xs leading-relaxed text-zinc-400">
          {`insert into public.campaign_admins (user_id, role, label)
values ('<your-auth-user-uuid>', 'owner', 'Campaign lead');`}
        </pre>
      </div>
    </div>
  );
}
