import "server-only";

import { createSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

import type { LeaderboardRow, MyOrganizerRow, WardTeamStats } from "@/lib/organizing/types";

export async function fetchWardLeaderboard(
  wardSlug: string,
  limit = 15,
): Promise<LeaderboardRow[] | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServer();
  if (!supabase) return null;

  const { data, error } = await supabase.rpc("get_ward_leaderboard", {
    p_ward_slug: wardSlug,
    p_limit: limit,
  });

  if (error) return null;
  return (data ?? []) as LeaderboardRow[];
}

export async function fetchWardTeamStats(
  wardSlug: string,
): Promise<WardTeamStats | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServer();
  if (!supabase) return null;

  const { data, error } = await supabase.rpc("get_ward_team_stats", {
    p_ward_slug: wardSlug,
  });

  if (error || !data) return null;
  return data as WardTeamStats;
}

export async function fetchMyOrganizerRow(
  wardSlug: string,
): Promise<MyOrganizerRow | null> {
  const supabase = await createSupabaseServer();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("ward_organizers")
    .select("id, display_name, referral_code, commitment_goal, created_at")
    .eq("ward_slug", wardSlug)
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (error || !data) return null;
  return data as MyOrganizerRow;
}

export async function fetchDirectRecruitCount(
  organizerId: string,
): Promise<number | null> {
  const supabase = await createSupabaseServer();
  if (!supabase) return null;

  const { count, error } = await supabase
    .from("ward_organizers")
    .select("*", { count: "exact", head: true })
    .eq("parent_id", organizerId);

  if (error) return null;
  return count ?? 0;
}

export async function fetchDownstreamTotal(
  organizerId: string,
): Promise<number | null> {
  const supabase = await createSupabaseServer();
  if (!supabase) return null;

  const { data, error } = await supabase.rpc("organizer_descendant_count", {
    p_id: organizerId,
  });

  if (error) return null;
  return typeof data === "number" ? data : null;
}

export async function fetchLeaderboardRank(
  wardSlug: string,
  organizerId: string,
): Promise<number | null> {
  const rows = await fetchWardLeaderboard(wardSlug, 100);
  if (!rows?.length) return null;
  const idx = rows.findIndex((r) => r.id === organizerId);
  return idx >= 0 ? idx + 1 : null;
}
