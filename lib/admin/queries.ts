import "server-only";

import { createSupabaseServer } from "@/lib/supabase/server";

export type PendingEventRow = {
  id: string;
  created_at: string;
  title: string;
  event_kind: string;
  starts_at: string;
  ends_at: string | null;
  location_label: string;
  address: string | null;
  organizer_name: string;
  organizer_email: string;
  organizer_phone: string | null;
  is_demo: boolean;
  review_status: string;
};

export async function listPendingCampaignEvents(): Promise<PendingEventRow[] | null> {
  const supabase = await createSupabaseServer();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("campaign_events")
    .select(
      "id,created_at,title,event_kind,starts_at,ends_at,location_label,address,organizer_name,organizer_email,organizer_phone,is_demo,review_status",
    )
    .eq("review_status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("admin pending events:", error.message);
    return null;
  }
  return (data ?? []) as PendingEventRow[];
}

export type PulseStats = {
  pending_events: number;
  approved_events: number;
  rejected_events: number;
  total_events: number;
  organizers: number | null;
};

export async function getCampaignPulse(): Promise<PulseStats | null> {
  const supabase = await createSupabaseServer();
  if (!supabase) return null;
  const db = supabase;

  async function countEvents(status: string): Promise<number> {
    const { count, error } = await db
      .from("campaign_events")
      .select("*", { count: "exact", head: true })
      .eq("review_status", status);
    if (error) return 0;
    return count ?? 0;
  }

  const [pending_events, approved_events, rejected_events, totalRow, orgRow] = await Promise.all([
    countEvents("pending"),
    countEvents("approved"),
    countEvents("rejected"),
    db.from("campaign_events").select("*", { count: "exact", head: true }),
    db.from("ward_organizers").select("*", { count: "exact", head: true }),
  ]);

  const total_events = totalRow.count ?? 0;
  let organizers: number | null = null;
  if (!orgRow.error && typeof orgRow.count === "number") organizers = orgRow.count;

  return {
    pending_events,
    approved_events,
    rejected_events,
    total_events,
    organizers,
  };
}

export type TeamMemberRow = {
  user_id: string;
  role: string;
  label: string | null;
  created_at: string;
};

export async function listCampaignAdmins(): Promise<TeamMemberRow[] | null> {
  const supabase = await createSupabaseServer();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("campaign_admins")
    .select("user_id, role, label, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("admin team:", error.message);
    return null;
  }
  return (data ?? []) as TeamMemberRow[];
}
