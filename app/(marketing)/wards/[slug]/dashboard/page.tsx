import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { Card } from "@/components/ui/card";
import { SectionShell } from "@/components/layout/section-shell";
import { SupabaseNotice } from "@/components/wards/supabase-notice";
import { WardDashboardPanel } from "@/components/wards/ward-dashboard-panel";
import { WardSignOutButton } from "@/components/wards/ward-sign-out-button";
import { wards } from "@/content/wards";
import { mockOrganizerRow, mockReachList, mockWardStats } from "@/lib/dev/mock-dashboard";
import { DEV_COOKIE, isDevPortalEnabled } from "@/lib/dev-mode";
import { createSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  fetchDirectRecruitCount,
  fetchDownstreamTotal,
  fetchLeaderboardRank,
  fetchMyOrganizerRow,
  fetchWardTeamStats,
} from "@/lib/organizing/data";
import {
  countVoterDirectoryForWard,
  fetchReachOutListForOrganizer,
} from "@/lib/reach/queries";
import { getRequestOrigin } from "@/lib/request-origin";

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

  const jar = await cookies();
  const devWardDemo = jar.get(DEV_COOKIE.wardDemoSlug)?.value;
  if (isDevPortalEnabled() && devWardDemo === slug) {
    const siteBase = await getRequestOrigin();
    const me = mockOrganizerRow(slug);
    const reachList = mockReachList(slug);
    return (
      <SectionShell className="min-h-[70vh]">
        <Card className="mb-6 rounded-2xl border-amber-500/35 bg-amber-500/10 p-4 text-sm text-foreground shadow-sm">
          <strong className="font-semibold">Development preview.</strong> Dummy data only — set via{" "}
          <code className="rounded bg-background/80 px-1.5 py-0.5 font-mono text-xs">/dev</code>. Sign in with Supabase
          for a live ward dashboard.
        </Card>
        <WardDashboardPanel
          wardSlug={slug}
          wardLabel={ward.name}
          siteBase={siteBase}
          me={me}
          directRecruits={2}
          downstreamTotal={5}
          rank={3}
          stats={mockWardStats()}
          reachList={reachList}
          voterDirectoryCount={0}
          reachReadOnly
        />
        <p className="mt-10 text-center text-sm text-muted-foreground">
          <Link href={`/wards/${slug}`} className="font-semibold text-primary">
            ← Ward public board
          </Link>
        </p>
      </SectionShell>
    );
  }

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

  const [directRecruits, downstreamTotal, rank, stats, siteBase, reachList, voterDirCount] =
    await Promise.all([
      fetchDirectRecruitCount(me.id),
      fetchDownstreamTotal(me.id),
      fetchLeaderboardRank(slug, me.id),
      fetchWardTeamStats(slug),
      getRequestOrigin(),
      fetchReachOutListForOrganizer(me.id),
      countVoterDirectoryForWard(slug),
    ]);

  return (
    <SectionShell className="min-h-[70vh]">
      <div className="mb-6 flex justify-end">
        <WardSignOutButton />
      </div>
      <WardDashboardPanel
        wardSlug={slug}
        wardLabel={ward.name}
        siteBase={siteBase}
        me={me}
        directRecruits={directRecruits ?? 0}
        downstreamTotal={downstreamTotal ?? 0}
        rank={rank}
        stats={stats}
        reachList={reachList}
        voterDirectoryCount={voterDirCount}
      />
      <p className="mt-10 text-center text-sm text-muted-foreground">
        <Link href={`/wards/${slug}`} className="font-semibold text-primary">
          ← Ward public board
        </Link>
      </p>
    </SectionShell>
  );
}
