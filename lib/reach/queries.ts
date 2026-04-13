import "server-only";

import { createSupabaseServer } from "@/lib/supabase/server";
import type { ReachOutListRow, VoterDirectoryRow } from "@/lib/reach/types";

export async function fetchReachOutListForOrganizer(
  organizerId: string,
): Promise<ReachOutListRow[]> {
  const supabase = await createSupabaseServer();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("reach_out_list_items")
    .select(
      "id,organizer_id,voter_directory_entry_id,display_name,address_line,city,zip,phone,email,notes,created_at",
    )
    .eq("organizer_id", organizerId)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error("fetchReachOutListForOrganizer:", error.message);
    return [];
  }
  return (data ?? []) as ReachOutListRow[];
}

export async function countVoterDirectoryForWard(wardSlug: string): Promise<number> {
  const supabase = await createSupabaseServer();
  if (!supabase) return 0;

  const { count, error } = await supabase
    .from("voter_directory_entries")
    .select("*", { count: "exact", head: true })
    .eq("ward_slug", wardSlug);

  if (error) return 0;
  return count ?? 0;
}

export async function searchVoterDirectory(
  wardSlug: string,
  query: string,
  limit = 25,
): Promise<VoterDirectoryRow[]> {
  const supabase = await createSupabaseServer();
  if (!supabase) return [];

  const raw = query.trim().slice(0, 120);
  if (raw.length < 2) return [];

  const { data, error } = await supabase.rpc("search_voter_directory", {
    p_ward: wardSlug,
    p_q: raw,
    p_limit: limit,
  });

  if (error) {
    console.error("searchVoterDirectory:", error.message);
    return [];
  }
  return (data ?? []) as VoterDirectoryRow[];
}
