import "server-only";

import { createSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

import type { CampaignEventPublic } from "@/lib/campaign-events/types";

export type ListCampaignEventsResult =
  | { status: "unconfigured" }
  | { status: "error" }
  | { status: "ok"; events: CampaignEventPublic[] };

/** Approved events from six hours ago onward (same-day grace) up to a year out. */
export async function listApprovedUpcomingCampaignEvents(): Promise<ListCampaignEventsResult> {
  if (!isSupabaseConfigured()) return { status: "unconfigured" };

  const supabase = await createSupabaseServer();
  if (!supabase) return { status: "unconfigured" };

  const since = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();
  const until = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("campaign_events")
    .select(
      "id,title,event_kind,starts_at,ends_at,location_label,address,ward_hint,audience,format_notes,organizer_name,organizer_email,organizer_phone,is_demo",
    )
    .eq("review_status", "approved")
    .gte("starts_at", since)
    .lte("starts_at", until)
    .order("starts_at", { ascending: true });

  if (error) {
    console.error("campaign_events list:", error.message);
    return { status: "error" };
  }

  return { status: "ok", events: (data ?? []) as CampaignEventPublic[] };
}
