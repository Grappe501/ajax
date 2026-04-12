import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { PrimaryButton } from "@/components/cta/primary-button";
import { SupabaseNotice } from "@/components/wards/supabase-notice";
import { WardOnboardForm } from "@/components/wards/ward-onboard-form";
import { wards } from "@/content/wards";
import { createSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { fetchMyOrganizerRow } from "@/lib/organizing/data";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ref?: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ward = wards.find((w) => w.slug === slug);
  return { title: ward ? `Onboard · ${ward.name}` : "Onboard" };
}

export default async function WardOnboardPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const ward = wards.find((w) => w.slug === slug);
  if (!ward) notFound();

  const defaultRef = typeof sp.ref === "string" ? sp.ref : "";

  if (!isSupabaseConfigured()) {
    return (
      <SectionShell>
        <SectionHeading title="Finish your ward profile" subtitle={ward.name} />
        <SupabaseNotice />
      </SectionShell>
    );
  }

  const supabase = await createSupabaseServer();
  if (!supabase) {
    return (
      <SectionShell>
        <SupabaseNotice />
      </SectionShell>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <SectionShell className="min-h-[50vh]">
        <SectionHeading
          title="Sign in first"
          subtitle="Use the magic link we emailed you, or request a new one."
        />
        <PrimaryButton href={`/wards/${slug}/join`}>Request sign-in link</PrimaryButton>
      </SectionShell>
    );
  }

  const existing = await fetchMyOrganizerRow(slug);
  if (existing) {
    redirect(`/wards/${slug}/dashboard`);
  }

  return (
    <SectionShell className="min-h-[60vh]">
      <SectionHeading
        title={`Welcome to ${ward.name}`}
        subtitle="Set how you appear on the leaderboard. Add an inviter code if someone recruited you."
      />
      <div className="mx-auto max-w-md">
        <WardOnboardForm wardSlug={slug} defaultParentRef={defaultRef} />
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link href={`/wards/${slug}`} className="text-primary">
          ← Ward overview
        </Link>
      </p>
    </SectionShell>
  );
}
