"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type OnboardResult =
  | { ok: true }
  | { ok: false; code: "not_configured" | "auth" | "bad_parent" | "exists" | "insert" };

export async function completeOrganizerProfile(
  wardSlug: string,
  displayName: string,
  parentReferralCode: string | null,
): Promise<OnboardResult> {
  if (!isSupabaseConfigured()) return { ok: false, code: "not_configured" };

  const supabase = await createSupabaseServer();
  if (!supabase) return { ok: false, code: "not_configured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, code: "auth" };

  const name = displayName.trim();
  if (!name) return { ok: false, code: "insert" };

  let parentId: string | null = null;
  const code = parentReferralCode?.trim().toLowerCase();
  if (code) {
    const { data: parent, error: pErr } = await supabase
      .from("ward_organizers")
      .select("id")
      .eq("ward_slug", wardSlug)
      .eq("referral_code", code)
      .maybeSingle();

    if (pErr || !parent) return { ok: false, code: "bad_parent" };
    parentId = parent.id;
  }

  const { error } = await supabase.from("ward_organizers").insert({
    auth_user_id: user.id,
    ward_slug: wardSlug,
    display_name: name,
    parent_id: parentId,
  });

  if (error) {
    if (error.code === "23505") return { ok: false, code: "exists" };
    return { ok: false, code: "insert" };
  }

  revalidatePath(`/wards/${wardSlug}`);
  revalidatePath(`/wards/${wardSlug}/dashboard`);
  return { ok: true };
}
