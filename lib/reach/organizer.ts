import "server-only";

import { createSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function getMyOrganizerIdForWard(
  wardSlug: string,
): Promise<{ ok: true; organizerId: string } | { ok: false }> {
  if (!isSupabaseConfigured()) return { ok: false };

  const supabase = await createSupabaseServer();
  if (!supabase) return { ok: false };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false };

  const { data, error } = await supabase
    .from("ward_organizers")
    .select("id")
    .eq("ward_slug", wardSlug)
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (error || !data?.id) return { ok: false };
  return { ok: true, organizerId: data.id };
}
