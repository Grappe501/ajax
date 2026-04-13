import type { Metadata } from "next";
import Link from "next/link";

import { WardMagicLinkForm } from "@/components/wards/ward-magic-link-form";
import { SupabaseNotice } from "@/components/wards/supabase-notice";
import { getRequestOrigin } from "@/lib/request-origin";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Sign in",
};

type Props = { searchParams: Promise<{ next?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" && sp.next.startsWith("/admin") ? sp.next : "/admin";
  const origin = await getRequestOrigin();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#050a12] px-4 py-16 text-zinc-100">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#070f1c] p-8 shadow-2xl">
        <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-[#fdb913]">
          AJAX Command
        </p>
        <h1 className="font-display mt-3 text-2xl font-bold tracking-tight">Sign in to operations</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Use the email on file for your admin invite. After the magic link, you&apos;ll land on the
          dashboard. Access is granted only if your account is listed in{" "}
          <code className="rounded bg-white/10 px-1 py-0.5 text-xs">campaign_admins</code>.
        </p>
        {!isSupabaseConfigured() ? (
          <div className="mt-6">
            <SupabaseNotice />
          </div>
        ) : (
          <div className="mt-8">
            <WardMagicLinkForm redirectOrigin={origin} nextPath={next} />
          </div>
        )}
        <p className="mt-8 text-center text-xs text-zinc-500">
          <Link href="/" className="font-medium text-[#fdb913] hover:underline">
            ← Back to public site
          </Link>
        </p>
      </div>
    </div>
  );
}
