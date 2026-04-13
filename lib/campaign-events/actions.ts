"use server";

import { revalidatePath } from "next/cache";

import { CAMPAIGN_EVENT_KINDS, type CampaignEventKind } from "@/lib/campaign-events/kinds";
import { createSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubmitCampaignEventResult =
  | { ok: true }
  | { ok: false; code: "not_configured" | "validation" | "insert" };

function clamp(s: string, max: number): string {
  return s.trim().slice(0, max);
}

function isKind(v: string): v is CampaignEventKind {
  return (CAMPAIGN_EVENT_KINDS as readonly string[]).includes(v);
}

export async function submitCampaignEvent(formData: FormData): Promise<SubmitCampaignEventResult> {
  if (!isSupabaseConfigured()) return { ok: false, code: "not_configured" };

  const supabase = await createSupabaseServer();
  if (!supabase) return { ok: false, code: "not_configured" };

  const honeypot = String(formData.get("company_website") ?? "");
  if (honeypot.length > 0) return { ok: true };

  const title = clamp(String(formData.get("title") ?? ""), 200);
  const eventKindRaw = String(formData.get("event_kind") ?? "");
  const startsIso = String(formData.get("starts_at_iso") ?? "");
  const endsIsoRaw = String(formData.get("ends_at_iso") ?? "").trim();
  const locationLabel = clamp(String(formData.get("location_label") ?? ""), 200);
  const address = clamp(String(formData.get("address") ?? ""), 500);
  const wardHint = clamp(String(formData.get("ward_hint") ?? ""), 120);
  const audience = clamp(String(formData.get("audience") ?? ""), 2000);
  const formatNotes = clamp(String(formData.get("format_notes") ?? ""), 4000);
  const organizerName = clamp(String(formData.get("organizer_name") ?? ""), 120);
  const organizerEmail = clamp(String(formData.get("organizer_email") ?? ""), 254).toLowerCase();
  const organizerPhone = clamp(String(formData.get("organizer_phone") ?? ""), 40);

  if (!title || title.length < 4) return { ok: false, code: "validation" };
  if (!isKind(eventKindRaw)) return { ok: false, code: "validation" };
  if (!locationLabel) return { ok: false, code: "validation" };
  if (!organizerName || !organizerEmail || !EMAIL_RE.test(organizerEmail)) {
    return { ok: false, code: "validation" };
  }

  const starts = Date.parse(startsIso);
  if (Number.isNaN(starts)) return { ok: false, code: "validation" };

  let endsAt: string | null = null;
  if (endsIsoRaw) {
    const ends = Date.parse(endsIsoRaw);
    if (Number.isNaN(ends) || ends < starts) return { ok: false, code: "validation" };
    endsAt = new Date(ends).toISOString();
  }

  const { error } = await supabase.from("campaign_events").insert({
    title,
    event_kind: eventKindRaw,
    starts_at: new Date(starts).toISOString(),
    ends_at: endsAt,
    location_label: locationLabel,
    address: address || null,
    ward_hint: wardHint || null,
    audience: audience || null,
    format_notes: formatNotes || null,
    organizer_name: organizerName,
    organizer_email: organizerEmail,
    organizer_phone: organizerPhone || null,
  });

  if (error) {
    console.error("campaign_events insert:", error.message);
    return { ok: false, code: "insert" };
  }

  revalidatePath("/events");
  revalidatePath("/events/submit");
  revalidatePath("/admin");
  revalidatePath("/admin/approvals");
  return { ok: true };
}
