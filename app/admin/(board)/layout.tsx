import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { getCampaignAdminSession } from "@/lib/admin/auth";
import { DEV_COOKIE, isDevAdminBypassAllowed } from "@/lib/dev-mode";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function AdminBoardLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  if (isDevAdminBypassAllowed() && jar.get(DEV_COOKIE.adminBypass)?.value === "1") {
    return (
      <AdminShell role="owner" email="dev.preview@local">
        {children}
      </AdminShell>
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-dvh bg-[#050a12] p-8 text-zinc-300">
        <p className="font-display text-lg font-bold text-white">Supabase not configured</p>
        <p className="mt-2 text-sm text-zinc-400">Connect the database to use the operations board.</p>
      </div>
    );
  }

  const session = await getCampaignAdminSession();

  if (!session.ok && session.reason === "not_signed_in") {
    redirect("/admin/login?next=/admin");
  }

  if (!session.ok) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-[#050a12] px-4 text-center text-zinc-300">
        <p className="font-display text-xl font-bold text-white">Access restricted</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
          You&apos;re signed in, but this account isn&apos;t on the campaign admin roster yet. Ask an
          owner to add your user ID to{" "}
          <code className="rounded bg-white/10 px-1 py-0.5 text-xs text-[#fdb913]">
            campaign_admins
          </code>{" "}
          in Supabase.
        </p>
        <Link href="/" className="mt-8 text-sm font-semibold text-[#fdb913] hover:underline">
          Return home
        </Link>
      </div>
    );
  }

  return (
    <AdminShell role={session.role} email={session.email}>
      {children}
    </AdminShell>
  );
}
