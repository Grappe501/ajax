import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { SupabaseNotice } from "@/components/wards/supabase-notice";
import { WardMagicLinkForm } from "@/components/wards/ward-magic-link-form";
import { wards } from "@/content/wards";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getRequestOrigin } from "@/lib/request-origin";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ref?: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ward = wards.find((w) => w.slug === slug);
  return { title: ward ? `Join ${ward.name}` : "Join ward" };
}

export default async function WardJoinPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const ward = wards.find((w) => w.slug === slug);
  if (!ward) notFound();

  const origin = await getRequestOrigin();
  const ref = typeof sp.ref === "string" ? sp.ref : undefined;
  const nextPath = `/wards/${slug}/onboard${ref ? `?ref=${encodeURIComponent(ref)}` : ""}`;

  return (
    <SectionShell className="min-h-[60vh]">
      <SectionHeading
        title={`Join ${ward.name} organizing board`}
        subtitle="Sign in with email — we will send a magic link. After you confirm, you will set your display name and optional inviter code."
      />
      {ref ? (
        <p className="mb-6 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground">
          Connecting you with inviter code{" "}
          <span className="font-mono font-semibold">{ref}</span> after sign-in.
        </p>
      ) : null}
      {!isSupabaseConfigured() ? (
        <SupabaseNotice />
      ) : (
        <div className="mx-auto max-w-md">
          <WardMagicLinkForm redirectOrigin={origin} nextPath={nextPath} />
        </div>
      )}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already finished onboarding?{" "}
        <Link href={`/wards/${slug}/dashboard`} className="font-semibold text-primary">
          Open your dashboard
        </Link>
      </p>
    </SectionShell>
  );
}
