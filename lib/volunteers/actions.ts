"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubmitVolunteerSignupResult =
  | { ok: true }
  | { ok: false; code: "not_configured" | "validation" | "insert" };

function clamp(s: string, max: number): string {
  return s.trim().slice(0, max);
}

function boolFromForm(fd: FormData, key: string): boolean {
  return String(fd.get(key) ?? "") === "yes";
}

export async function submitVolunteerSignup(
  formData: FormData,
): Promise<SubmitVolunteerSignupResult> {
  if (!isSupabaseConfigured()) return { ok: false, code: "not_configured" };

  const supabase = await createSupabaseServer();
  if (!supabase) return { ok: false, code: "not_configured" };

  const bot = String(formData.get("bot-field") ?? "");
  if (bot.length > 0) return { ok: true };

  const firstName = clamp(String(formData.get("firstName") ?? ""), 120);
  const lastName = clamp(String(formData.get("lastName") ?? ""), 120);
  const email = clamp(String(formData.get("email") ?? ""), 254).toLowerCase();
  const phone = clamp(String(formData.get("phone") ?? ""), 40);
  const zipCode = clamp(String(formData.get("zipCode") ?? ""), 20);
  const notes = clamp(String(formData.get("notes") ?? ""), 4000) || null;

  if (!firstName || !lastName) return { ok: false, code: "validation" };
  if (!email || !EMAIL_RE.test(email)) return { ok: false, code: "validation" };
  if (!phone || !zipCode) return { ok: false, code: "validation" };

  const { error } = await supabase.from("volunteer_signups").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    zip_code: zipCode,
    help_event_volunteer: boolFromForm(formData, "help_event_volunteer"),
    help_petition_carrier: boolFromForm(formData, "help_petition_carrier"),
    help_church_outreach: boolFromForm(formData, "help_church_outreach"),
    help_tabling: boolFromForm(formData, "help_tabling"),
    help_phone_text: boolFromForm(formData, "help_phone_text"),
    help_hosting: boolFromForm(formData, "help_hosting"),
    help_leadership: boolFromForm(formData, "help_leadership"),
    notes,
    source: "volunteer_page",
  });

  if (error) {
    console.error("volunteer_signups insert:", error.message);
    return { ok: false, code: "insert" };
  }

  revalidatePath("/volunteer");
  revalidatePath("/admin");
  revalidatePath("/admin/volunteers");
  return { ok: true };
}
