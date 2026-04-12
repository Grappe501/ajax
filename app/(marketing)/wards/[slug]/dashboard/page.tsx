import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { SectionShell } from "@/components/layout/section-shell";
import { PrimaryButton } from "@/components/cta/primary-button";
import { SupabaseNotice } from "@/components/wards/supabase-notice";
import { WardDashboardPanel } from "@/components/wards/ward-dashboard-panel";
import { WardSignOutButton } from "@/components/wards/ward-sign-out-button";
import { wards } from "@/content/wards";
import { createSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  fetchDirectRecruitCount,
  fetchDownstreamTotal,
  fetchLeaderboardRank,
  fetchMyOrganizerRow,
  fetchWardTeamStats,
} from "@/lib/organizing/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ward = wards.find((w) => w.slug === slug);
  return { title: ward ? `Dashboard · ${ward.name}` : "Dashboard" };
}

export default async function WardDashboardPage({ params }: Props) {
  const { slug } = await params;
  const ward = wards.find((w) => w.slug === slug);
  if (!ward) notFound();

  if (!isSupabaseConfigured()) {
    return (
      <SectionShell>
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
    redirect(`/wards/${slug}/join`);
  }

  const me = await fetchMyOrganizerRow(slug);
  if (!me) {
    redirect(`/wards/${slug}/onboard`);
  }

  const [directRecruits, downstreamTotal, rank, stats] = await Promise.all([
    fetchDirectRecruitCount(me.id),
    fetchDownstreamTotal(me.id),
    fetchLeaderboardRank(slug, me.id),
    fetchWardTeamStats(slug),
  ]);

  return (
    <SectionShell className="min-h-[70vh]">
      <div className="mb-6 flex justify-end">
        <WardSignOutButton />
      </div>
      <WardDashboardPanel
        wardSlug={slug}
        wardLabel={ward.name}
        me={me}
        directRecruits={directRecruits ?? 0}
        downstreamTotal={downstreamTotal ?? 0}
        rank={rank}
        stats={stats}
      />
      <p className="mt-10 text-center text-sm text-muted-foreground">
        <Link href={`/wards/${slug}`} className="font-semibold text-primary">
          ← Ward public board
        </Link>
      </p>
    </SectionShell>
  );
}
