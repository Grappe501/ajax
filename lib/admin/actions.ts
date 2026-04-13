"use server";

import { revalidatePath } from "next/cache";

import { getCampaignAdminSession, type CampaignAdminRole } from "@/lib/admin/auth";
import { createSupabaseServer } from "@/lib/supabase/server";

function canModerateEvents(role: CampaignAdminRole): boolean {
  return role === "owner" || role === "coordinator";
}

export type ModerationResult = { ok: true } | { ok: false; error: string };

export async function approveCampaignEvent(eventId: string): Promise<ModerationResult> {
  const session = await getCampaignAdminSession();
  if (!session.ok) return { ok: false, error: "Unauthorized" };
  if (!canModerateEvents(session.role)) return { ok: false, error: "Your role is view-only for approvals." };

  const supabase = await createSupabaseServer();
  if (!supabase) return { ok: false, error: "Server misconfigured" };

  const { error } = await supabase
    .from("campaign_events")
    .update({
      review_status: "approved",
      reviewed_at: new Date().toISOString(),
      reviewed_by: session.userId,
      review_note: null,
    })
    .eq("id", eventId)
    .eq("review_status", "pending");

  if (error) {
    console.error("approve event:", error.message);
    return { ok: false, error: error.message };
  }

  revalidatePath("/events");
  revalidatePath("/admin");
  revalidatePath("/admin/approvals");
  return { ok: true };
}

export async function rejectCampaignEvent(
  eventId: string,
  note: string | undefined,
): Promise<ModerationResult> {
  const session = await getCampaignAdminSession();
  if (!session.ok) return { ok: false, error: "Unauthorized" };
  if (!canModerateEvents(session.role)) return { ok: false, error: "Your role is view-only for approvals." };

  const supabase = await createSupabaseServer();
  if (!supabase) return { ok: false, error: "Server misconfigured" };

  const trimmed = note?.trim().slice(0, 2000) ?? "";

  const { error } = await supabase
    .from("campaign_events")
    .update({
      review_status: "rejected",
      reviewed_at: new Date().toISOString(),
      reviewed_by: session.userId,
      review_note: trimmed || null,
    })
    .eq("id", eventId)
    .eq("review_status", "pending");

  if (error) {
    console.error("reject event:", error.message);
    return { ok: false, error: error.message };
  }

  revalidatePath("/events");
  revalidatePath("/admin");
  revalidatePath("/admin/approvals");
  return { ok: true };
}
