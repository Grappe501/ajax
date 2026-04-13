import "server-only";

import { createSupabaseServer } from "@/lib/supabase/server";
import type { LeaderboardRow, MyOrganizerRow, WardTeamStats } from "@/lib/organizing/types";

type OrgNode = {
  id: string;
  parent_id: string | null;
  display_name: string;
  referral_code: string | null;
  commitment_goal: number | null;
  created_at: string;
};

function buildChildrenMap(rows: { id: string; parent_id: string | null }[]) {
  const m = new Map<string, string[]>();
  for (const r of rows) {
    if (!r.parent_id) continue;
    if (!m.has(r.parent_id)) m.set(r.parent_id, []);
    m.get(r.parent_id)!.push(r.id);
  }
  return m;
}

/** All descendants (not counting self) — BFS */
function countDescendants(
  rootId: string,
  children: Map<string, string[]>,
): number {
  let n = 0;
  const q = [...(children.get(rootId) ?? [])];
  while (q.length) {
    const id = q.shift()!;
    n++;
    q.push(...(children.get(id) ?? []));
  }
  return n;
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

  return {
    id: data.id,
    display_name: data.display_name,
    referral_code: data.referral_code ?? "",
    commitment_goal: data.commitment_goal ?? 5,
    created_at: data.created_at,
  };
}

export async function fetchWardTeamStats(
  wardSlug: string,
): Promise<WardTeamStats | null> {
  const supabase = await createSupabaseServer();
  if (!supabase) return null;

  const { count: organizer_count } = await supabase
    .from("ward_organizers")
    .select("*", { count: "exact", head: true })
    .eq("ward_slug", wardSlug);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const { count: new_this_week } = await supabase
    .from("ward_organizers")
    .select("*", { count: "exact", head: true })
    .eq("ward_slug", wardSlug)
    .gte("created_at", weekAgo.toISOString());

  return {
    organizer_count: organizer_count ?? 0,
    new_this_week: new_this_week ?? 0,
  };
}

export async function fetchWardLeaderboard(
  wardSlug: string,
  limit: number,
): Promise<LeaderboardRow[] | null> {
  const supabase = await createSupabaseServer();
  if (!supabase) return null;

  const { data: rows, error } = await supabase
    .from("ward_organizers")
    .select("id, parent_id, display_name, referral_code, commitment_goal, created_at")
    .eq("ward_slug", wardSlug);

  if (error || !rows?.length) return [];

  const nodes = rows as OrgNode[];
  const children = buildChildrenMap(nodes);

  const scored: LeaderboardRow[] = nodes.map((o) => {
    const direct = children.get(o.id)?.length ?? 0;
    const downstream_total = countDescendants(o.id, children);
    return {
      id: o.id,
      display_name: o.display_name,
      referral_code: o.referral_code ?? "",
      direct_recruits: direct,
      downstream_total,
      commitment_goal: o.commitment_goal ?? 5,
      created_at: o.created_at,
    };
  });

  scored.sort((a, b) => {
    if (b.downstream_total !== a.downstream_total) {
      return b.downstream_total - a.downstream_total;
    }
    if (b.direct_recruits !== a.direct_recruits) {
      return b.direct_recruits - a.direct_recruits;
    }
    return a.display_name.localeCompare(b.display_name);
  });

  return scored.slice(0, limit);
}

export async function fetchDirectRecruitCount(organizerId: string): Promise<number | null> {
  const supabase = await createSupabaseServer();
  if (!supabase) return null;
  const { count } = await supabase
    .from("ward_organizers")
    .select("*", { count: "exact", head: true })
    .eq("parent_id", organizerId);
  return count ?? 0;
}

export async function fetchDownstreamTotal(organizerId: string): Promise<number | null> {
  const supabase = await createSupabaseServer();
  if (!supabase) return null;

  const ward = await organizerWardSlug(supabase, organizerId);
  if (!ward) return 0;

  const { data: rows } = await supabase
    .from("ward_organizers")
    .select("id, parent_id")
    .eq("ward_slug", ward);

  if (!rows?.length) return 0;

  const children = buildChildrenMap(rows);
  return countDescendants(organizerId, children);
}

async function organizerWardSlug(
  supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServer>>>,
  organizerId: string,
): Promise<string | null> {
  const { data } = await supabase
    .from("ward_organizers")
    .select("ward_slug")
    .eq("id", organizerId)
    .maybeSingle();
  return data?.ward_slug ?? null;
}

export async function fetchLeaderboardRank(
  wardSlug: string,
  organizerId: string,
): Promise<number | null> {
  const board = await fetchWardLeaderboard(wardSlug, 500);
  if (!board) return null;
  const idx = board.findIndex((r) => r.id === organizerId);
  return idx === -1 ? null : idx + 1;
}
