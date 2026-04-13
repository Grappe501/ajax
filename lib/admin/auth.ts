import "server-only";

import { createSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type CampaignAdminRole = "owner" | "coordinator" | "analyst";

export type AdminSession =
  | { ok: false; reason: "no_supabase" | "not_signed_in" | "forbidden" }
  | {
      ok: true;
      userId: string;
      email: string | null;
      role: CampaignAdminRole;
      label: string | null;
    };

export async function getCampaignAdminSession(): Promise<AdminSession> {
  if (!isSupabaseConfigured()) return { ok: false, reason: "no_supabase" };

  const supabase = await createSupabaseServer();
  if (!supabase) return { ok: false, reason: "no_supabase" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, reason: "not_signed_in" };

  const { data: row, error } = await supabase
    .from("campaign_admins")
    .select("role, label")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !row) {
    return { ok: false, reason: "forbidden" };
  }

  return {
    ok: true,
    userId: user.id,
    email: user.email ?? null,
    role: row.role as CampaignAdminRole,
    label: row.label,
  };
}
