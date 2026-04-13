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
  volunteer_signups: number | null;
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

  const [pending_events, approved_events, rejected_events, totalRow, orgRow, volRow] =
    await Promise.all([
      countEvents("pending"),
      countEvents("approved"),
      countEvents("rejected"),
      db.from("campaign_events").select("*", { count: "exact", head: true }),
      db.from("ward_organizers").select("*", { count: "exact", head: true }),
      db.from("volunteer_signups").select("*", { count: "exact", head: true }),
    ]);

  const total_events = totalRow.count ?? 0;
  let organizers: number | null = null;
  if (!orgRow.error && typeof orgRow.count === "number") organizers = orgRow.count;
  let volunteer_signups: number | null = null;
  if (!volRow.error && typeof volRow.count === "number") volunteer_signups = volRow.count;

  return {
    pending_events,
    approved_events,
    rejected_events,
    total_events,
    organizers,
    volunteer_signups,
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

export type VolunteerSignupRow = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  zip_code: string;
  help_event_volunteer: boolean;
  help_petition_carrier: boolean;
  help_church_outreach: boolean;
  help_tabling: boolean;
  help_phone_text: boolean;
  help_hosting: boolean;
  help_leadership: boolean;
  notes: string | null;
  source: string;
};

export type OutreachQueueRow = {
  id: string;
  channel: string;
  message_subject: string | null;
  message_body: string;
  contact_phone: string | null;
  contact_email: string | null;
  status: string;
  created_at: string;
  organizer_id: string;
  organizer_display_name: string | null;
  organizer_ward_slug: string | null;
};

export async function listPendingOutreachQueue(): Promise<OutreachQueueRow[] | null> {
  const supabase = await createSupabaseServer();
  if (!supabase) return null;

  const { data: rows, error } = await supabase
    .from("outreach_queue")
    .select("id,channel,message_subject,message_body,contact_phone,contact_email,status,created_at,organizer_id")
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(300);

  if (error) {
    console.error("listPendingOutreachQueue:", error.message);
    return null;
  }

  const list = rows ?? [];
  if (list.length === 0) return [];

  const orgIds = [...new Set(list.map((r) => r.organizer_id))];
  const { data: orgs, error: oErr } = await supabase
    .from("ward_organizers")
    .select("id,display_name,ward_slug")
    .in("id", orgIds);

  if (oErr) {
    console.error("listPendingOutreachQueue orgs:", oErr.message);
  }

  const map = new Map((orgs ?? []).map((o) => [o.id, o]));

  return list.map((r) => {
    const o = map.get(r.organizer_id);
    return {
      id: r.id,
      channel: r.channel,
      message_subject: r.message_subject,
      message_body: r.message_body,
      contact_phone: r.contact_phone,
      contact_email: r.contact_email,
      status: r.status,
      created_at: r.created_at,
      organizer_id: r.organizer_id,
      organizer_display_name: o?.display_name ?? null,
      organizer_ward_slug: o?.ward_slug ?? null,
    };
  });
}

export async function listVolunteerSignups(): Promise<VolunteerSignupRow[] | null> {
  const supabase = await createSupabaseServer();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("volunteer_signups")
    .select(
      "id,created_at,first_name,last_name,email,phone,zip_code,help_event_volunteer,help_petition_carrier,help_church_outreach,help_tabling,help_phone_text,help_hosting,help_leadership,notes,source",
    )
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    console.error("admin volunteer signups:", error.message);
    return null;
  }
  return (data ?? []) as VolunteerSignupRow[];
}
