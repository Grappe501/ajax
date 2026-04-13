/** Row as returned from Supabase (public approved reads). */
export type CampaignEventPublic = {
  id: string;
  title: string;
  event_kind: string;
  starts_at: string;
  ends_at: string | null;
  location_label: string;
  address: string | null;
  ward_hint: string | null;
  audience: string | null;
  format_notes: string | null;
  organizer_name: string;
  organizer_email: string;
  organizer_phone: string | null;
  is_demo: boolean;
};
