"use server";

import { revalidatePath } from "next/cache";

import { getCampaignAdminSession } from "@/lib/admin/auth";
import { getMyOrganizerIdForWard } from "@/lib/reach/organizer";
import { createSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

import type { VoterDirectoryRow } from "@/lib/reach/types";

export async function searchVotersInWard(
  wardSlug: string,
  q: string,
): Promise<{ ok: true; rows: VoterDirectoryRow[] } | { ok: false; rows: [] }> {
  if (!isSupabaseConfigured()) return { ok: false, rows: [] };

  const gate = await getMyOrganizerIdForWard(wardSlug);
  if (!gate.ok) return { ok: false, rows: [] };

  const supabase = await createSupabaseServer();
  if (!supabase) return { ok: false, rows: [] };

  const raw = q.trim().slice(0, 120);
  if (raw.length < 2) return { ok: true, rows: [] };

  const { data, error } = await supabase.rpc("search_voter_directory", {
    p_ward: wardSlug,
    p_q: raw,
    p_limit: 25,
  });

  if (error) {
    console.error("searchVotersInWard:", error.message);
    return { ok: false, rows: [] };
  }

  return { ok: true, rows: (data ?? []) as VoterDirectoryRow[] };
}

export async function addReachFromVoterDirectory(
  wardSlug: string,
  voterDirectoryEntryId: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (!isSupabaseConfigured()) return { ok: false, reason: "not_configured" };

  const gate = await getMyOrganizerIdForWard(wardSlug);
  if (!gate.ok) return { ok: false, reason: "auth" };

  const supabase = await createSupabaseServer();
  if (!supabase) return { ok: false, reason: "not_configured" };

  const { data: voter, error: vErr } = await supabase
    .from("voter_directory_entries")
    .select("id,display_name,address_line,city,zip,phone,email,ward_slug")
    .eq("id", voterDirectoryEntryId)
    .maybeSingle();

  if (vErr || !voter || voter.ward_slug !== wardSlug) {
    return { ok: false, reason: "not_found" };
  }

  const { data: existing } = await supabase
    .from("reach_out_list_items")
    .select("id")
    .eq("organizer_id", gate.organizerId)
    .eq("voter_directory_entry_id", voterDirectoryEntryId)
    .maybeSingle();

  if (existing) return { ok: false, reason: "duplicate" };

  const { error } = await supabase.from("reach_out_list_items").insert({
    organizer_id: gate.organizerId,
    voter_directory_entry_id: voterDirectoryEntryId,
    display_name: voter.display_name,
    address_line: voter.address_line,
    city: voter.city,
    zip: voter.zip,
    phone: voter.phone,
    email: voter.email,
  });

  if (error) {
    console.error("addReachFromVoterDirectory:", error.message);
    return { ok: false, reason: "insert" };
  }

  revalidatePath(`/wards/${wardSlug}/dashboard`);
  return { ok: true };
}

export async function addReachManual(
  wardSlug: string,
  fields: {
    displayName: string;
    addressLine?: string;
    city?: string;
    zip?: string;
    phone?: string;
    email?: string;
    notes?: string;
  },
): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (!isSupabaseConfigured()) return { ok: false, reason: "not_configured" };

  const gate = await getMyOrganizerIdForWard(wardSlug);
  if (!gate.ok) return { ok: false, reason: "auth" };

  const name = fields.displayName.trim();
  if (!name) return { ok: false, reason: "name" };

  const supabase = await createSupabaseServer();
  if (!supabase) return { ok: false, reason: "not_configured" };

  const { error } = await supabase.from("reach_out_list_items").insert({
    organizer_id: gate.organizerId,
    voter_directory_entry_id: null,
    display_name: name,
    address_line: fields.addressLine?.trim() || null,
    city: fields.city?.trim() || null,
    zip: fields.zip?.trim() || null,
    phone: fields.phone?.trim() || null,
    email: fields.email?.trim() || null,
    notes: fields.notes?.trim() || null,
  });

  if (error) {
    console.error("addReachManual:", error.message);
    return { ok: false, reason: "insert" };
  }

  revalidatePath(`/wards/${wardSlug}/dashboard`);
  return { ok: true };
}

export async function queueOutreachRequest(
  wardSlug: string,
  payload: {
    reachOutListItemId: string;
    channel: "email" | "sms";
    messageSubject: string | null;
    messageBody: string;
    contactPhone: string | null;
    contactEmail: string | null;
  },
): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (!isSupabaseConfigured()) return { ok: false, reason: "not_configured" };

  const gate = await getMyOrganizerIdForWard(wardSlug);
  if (!gate.ok) return { ok: false, reason: "auth" };

  const body = payload.messageBody.trim();
  if (!body) return { ok: false, reason: "body" };

  const supabase = await createSupabaseServer();
  if (!supabase) return { ok: false, reason: "not_configured" };

  const { data: item, error: iErr } = await supabase
    .from("reach_out_list_items")
    .select("id,organizer_id")
    .eq("id", payload.reachOutListItemId)
    .maybeSingle();

  if (iErr || !item || item.organizer_id !== gate.organizerId) {
    return { ok: false, reason: "item" };
  }

  const { error } = await supabase.from("outreach_queue").insert({
    organizer_id: gate.organizerId,
    reach_out_list_item_id: payload.reachOutListItemId,
    channel: payload.channel,
    message_subject: payload.messageSubject?.trim() || null,
    message_body: body,
    contact_phone: payload.contactPhone?.trim() || null,
    contact_email: payload.contactEmail?.trim() || null,
    status: "pending",
  });

  if (error) {
    console.error("queueOutreachRequest:", error.message);
    return { ok: false, reason: "insert" };
  }

  revalidatePath(`/wards/${wardSlug}/dashboard`);
  revalidatePath("/admin/outreach");
  return { ok: true };
}

export async function removeReachListItem(
  wardSlug: string,
  reachOutListItemId: string,
): Promise<{ ok: true } | { ok: false }> {
  if (!isSupabaseConfigured()) return { ok: false };

  const gate = await getMyOrganizerIdForWard(wardSlug);
  if (!gate.ok) return { ok: false };

  const supabase = await createSupabaseServer();
  if (!supabase) return { ok: false };

  const { error } = await supabase
    .from("reach_out_list_items")
    .delete()
    .eq("id", reachOutListItemId)
    .eq("organizer_id", gate.organizerId);

  if (error) return { ok: false };

  revalidatePath(`/wards/${wardSlug}/dashboard`);
  return { ok: true };
}

export async function markOutreachSent(
  queueId: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const session = await getCampaignAdminSession();
  if (!session.ok) return { ok: false, reason: "forbidden" };

  const supabase = await createSupabaseServer();
  if (!supabase) return { ok: false, reason: "server" };

  const { error } = await supabase
    .from("outreach_queue")
    .update({
      status: "sent",
      sent_at: new Date().toISOString(),
      sent_by: session.userId,
    })
    .eq("id", queueId)
    .eq("status", "pending");

  if (error) {
    console.error("markOutreachSent:", error.message);
    return { ok: false, reason: "update" };
  }

  revalidatePath("/admin/outreach");
  return { ok: true };
}
