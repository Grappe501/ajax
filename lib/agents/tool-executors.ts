import "server-only";

import { listPendingCampaignEvents, getCampaignPulse } from "@/lib/admin/queries";
import { fetchReachOutListForOrganizer, searchVoterDirectory } from "@/lib/reach/queries";
import { getMyOrganizerIdForWard } from "@/lib/reach/organizer";

/** Sanitized voter rows for LLM tool output (minimize raw PII in model context). */
export async function toolSearchVotersInWard(wardSlug: string, query: string) {
  const rows = await searchVoterDirectory(wardSlug, query, 15);
  return rows.map((r) => ({
    name: r.display_name,
    address: [r.address_line, r.city, r.zip].filter(Boolean).join(", ") || null,
    phone_on_file: r.phone ? "yes" : "no",
    email_on_file: r.email ? "yes" : "no",
  }));
}

export async function toolSummarizeReachList(wardSlug: string) {
  const gate = await getMyOrganizerIdForWard(wardSlug);
  if (!gate.ok) return { error: "not_authorized" as const };

  const rows = await fetchReachOutListForOrganizer(gate.organizerId);
  return {
    total: rows.length,
    recent_names: rows.slice(0, 12).map((r) => r.display_name),
  };
}

export async function toolCampaignPulseSnapshot() {
  const [pulse, pending] = await Promise.all([getCampaignPulse(), listPendingCampaignEvents()]);
  return {
    pulse: pulse ?? { error: "unavailable" },
    pending_events: (pending ?? []).slice(0, 15).map((p) => ({
      id: p.id,
      title: p.title,
      starts_at: p.starts_at,
      organizer_email: p.organizer_email,
    })),
  };
}
