import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrimaryButton } from "@/components/cta/primary-button";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { RelationalOrganizingIntro } from "@/components/wards/relational-organizing-intro";
import { SupabaseNotice } from "@/components/wards/supabase-notice";
import { WardLeaderboard } from "@/components/wards/ward-leaderboard";
import { wards } from "@/content/wards";
import {
  fetchWardLeaderboard,
  fetchWardTeamStats,
} from "@/lib/organizing/data";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  return wards.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ward = wards.find((w) => w.slug === slug);
  if (!ward) return { title: "Ward" };
  return {
    title: `${ward.name} · Organizing board`,
    description: `${ward.summary} Relational organizing and ward leaderboard for AJAX.`,
  };
}

export default async function WardDetailPage({ params }: Props) {
  const { slug } = await params;
  const ward = wards.find((w) => w.slug === slug);
  if (!ward) notFound();

  const [leaderboard, teamStats] = await Promise.all([
    fetchWardLeaderboard(slug, 15),
    fetchWardTeamStats(slug),
  ]);

  return (
    <>
      <SectionShell className="border-b-0 pb-8 pt-10 md:pt-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Ward organizing board
            </p>
            <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              {ward.name}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{ward.summary}</p>
            <p className="mt-2 text-sm text-muted-foreground">{ward.captain}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryButton href={`/wards/${slug}/join`}>
              Join this board
            </PrimaryButton>
            <SecondaryButton href={`/wards/${slug}/dashboard`}>
              My dashboard
            </SecondaryButton>
            <SecondaryButton href="/wards">All wards</SecondaryButton>
          </div>
        </div>
      </SectionShell>

      {!isSupabaseConfigured() ? (
        <SectionShell muted className="border-t-0 pt-0">
          <SupabaseNotice />
        </SectionShell>
      ) : null}

      <SectionShell muted className="border-t-0">
        <RelationalOrganizingIntro stats={teamStats} />
      </SectionShell>

      <SectionShell className="border-t-0">
        <WardLeaderboard rows={leaderboard} wardName={ward.name} />
      </SectionShell>

      <SectionShell muted className="border-t-0 pb-20">
        <SectionHeading
          title="Own the pace"
          subtitle="Train your five, celebrate progress weekly, and keep the ladder honest. Speed follows trust."
        />
        <div className="flex flex-wrap gap-4">
          <PrimaryButton href={`/wards/${slug}/join`}>Start or grow my team</PrimaryButton>
          <SecondaryButton href="/training">Train the basics</SecondaryButton>
          <SecondaryButton href="/volunteer">Talk to a coordinator</SecondaryButton>
        </div>
      </SectionShell>
    </>
  );
}
